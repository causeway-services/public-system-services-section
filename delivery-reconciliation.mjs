/**
 * Delivery state for a client-bound outbound message.
 * Sending (or retaining a Sent copy) is not provider acceptance. A verified
 * permanent DSN closes the transport attempt as failed, not the underlying
 * client objective. This module cannot send, draft, or establish delegation.
 */
const STAMP = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
function timestamp(t, field) {
  if (typeof t !== 'string' || !STAMP.test(t) || !Number.isFinite(Date.parse(t)))
    throw new Error(field + ': RFC3339 timestamp required');
  return Date.parse(t);
}
function str(s, field) { if(typeof s!=='string'||!s.trim()) throw new Error(field + ' required'); return s.trim(); }
/**
 * A separately authenticated adapter MUST construct verified DSN evidence.
 * Neither this function nor a claimed verified flag proves authenticity.
 */
export function reconcileOutboundAttempt({clientId, attempt, evidence=[], alternateContacts=[]}) {
  str(clientId,'clientId');
  if (!attempt || attempt.clientId !== clientId || attempt.principalBound !== true ||
      attempt.sourceVerified !== true) throw new Error('outbound attempt not bound to principal');
  const sentId = str(attempt.messageId,'messageId');
  const account = str(attempt.accountId,'accountId');
  const recipient = str(attempt.recipient,'recipient').toLowerCase();
  const sentAt = timestamp(attempt.sentAt,'sentAt');
  if (!Array.isArray(evidence) || !Array.isArray(alternateContacts))throw new Error('evidence and alternatives must be arrays');
  const ids=new Map(); let failure=null, acceptance=null;
  for (const e of evidence) {
    if(e?.principalBound!==true || e?.adapterAuthenticated!==true || e?.clientId!==clientId ||
      e?.accountId!==account || e?.originalMessageId!==sentId ||
      typeof e?.recipient!=='string' || e.recipient.toLowerCase()!==recipient)
      throw new Error('delivery evidence principal or attempt mismatch');
    const id=str(e.eventId,'eventId');
    const fingerprint = JSON.stringify([e.clientId,e.accountId,e.originalMessageId,e.recipient.toLowerCase(),e.eventAt,e.kind,e.enhancedStatus]);
    if(ids.has(id)) {
      if(ids.get(id)!==fingerprint) throw new Error('conflicting replay of provider delivery event');
      continue;
    }
    ids.set(id,fingerprint);
    const eventAt=timestamp(e.eventAt,'eventAt');
    if(eventAt<sentAt) throw new Error('delivery evidence precedes send');
    if (!['permanent_failure','temporary_failure','transport_accepted'].includes(e.kind))
      throw new Error('unsupported transport event kind');
    if (!/^\d\.\d{1,3}\.\d{1,3}$/.test(e.enhancedStatus))
      throw new Error('enhanced SMTP status required');
    const prefix=e.enhancedStatus[0];
    if ((e.kind==='permanent_failure' && prefix!=='5') ||
        (e.kind==='temporary_failure' && prefix!=='4') ||
        (e.kind==='transport_accepted' && prefix!=='2')) throw new Error('SMTP status contradicts outcome');
    if(e.kind==='permanent_failure') failure=e;
    if(e.kind==='transport_accepted') acceptance=e;
  }
  if(failure && acceptance) throw new Error('contradictory terminal transport evidence requires investigation');
  const contacts=alternateContacts.filter(c=>c?.sourceVerified===true&&c?.providerOfficial===true&&
    c?.principalScope===clientId&&typeof c.address==='string'&&c.address.includes('@')&&
    c.address.toLowerCase()!==recipient).map(c=>({address:c.address,sourceRef:str(c.sourceRef,'alternate sourceRef')}));
  return {messageId:sentId,recipient,transport:
    failure?'failed':acceptance?'accepted_not_effect_verified':evidence.length?'unconfirmed':'sent_unconfirmed',
    failureRef:failure?.eventId??null, alternateContacts:failure?contacts:[],
    needsNewClientAuthorizationForExternalSend:true};
}
