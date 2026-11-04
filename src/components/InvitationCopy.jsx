import { WEDDING_DATE } from '../wedding.js'
import './InvitationCopy.css'

export default function InvitationCopy({ compact = false, headingRef }) {
  const Heading = compact ? 'div' : 'h1'
  return <>
    <p className="invite-prelude">Together with their families</p>
    <Heading className="invitation-names" id={compact ? undefined : 'couple-names'} ref={headingRef} tabIndex={compact ? undefined : -1} aria-label={compact ? undefined : 'Jiv Stevens T. Gonzales and Rochelle Ann P. Reyes'}>
      <span className="invitation-name">Jiv Stevens T. Gonzales</span>
      <span className="invitation-and">and</span>
      <span className="invitation-name">Rochelle Ann P. Reyes</span>
    </Heading>
    <p className="invite-request">invite you to celebrate their marriage</p>
    <time className="wedding-date" dateTime={WEDDING_DATE}>Sunday, 07 February 2027.</time>
  </>
}
