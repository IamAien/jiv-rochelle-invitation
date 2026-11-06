# Google Forms RSVP

The invitation has an RSVP navigation link and a matching section after Attire, connected to the couple's published Google Form in `src/rsvp.js`. Both the responder page and embedded URL load successfully without an authenticated session. The form asks for first name, last name, attendance, optional email address and mobile number, and a personal message. The website's copy follows those questions. It does not collect dietary requirements or household guest counts.

The connection was checked through public HTTP requests without cookies. Browser interaction, submitting a response, editing that response, and confirming storage in the private response sheet still require an end-to-end test with the form owner. No test responses were submitted during the connection check.

Guests open the form using the RSVP button or its direct-link fallback. The QR code and its source artwork have been removed from the website.

## Create the form in your account

You can create it manually at https://forms.google.com, or use the prepared script:

1. Open https://script.google.com and create a new project in the Google account that will own the responses.
2. Copy `scripts/create-google-rsvp.gs` into the project's `Code.gs` editor and save.
3. Select `prepareWeddingRsvp` and click Run. Review Google's request to access Forms and Sheets in your account.
4. Open the draft form's edit link from the execution log. The script also creates and links a private response spreadsheet. Re-running it returns the same draft instead of duplicating it. If the first run failed partway through, inspect that draft and finish the remaining questions manually.
5. Review the questions and add a header or change the colors if desired.
6. Publish the form with responder access set to **Anyone with the link**. Keep the response sheet and form editing access private.
7. Open the guest-facing link in a signed-out/private browser window. Verify that you can complete it without logging in.
8. Send the guest-facing link to the website editor. Prefer the full `https://docs.google.com/forms/d/e/.../viewform` link for embedding. A `https://forms.gle/...` short link will open directly in a new tab.

The script creates a draft only. It has not been executed in a Google account or tested against a real form in this session.

## Questions

- Your full name — required short answer; one response per invited household.
- Will you be joining us? — required choice: Joyfully accepts / Regretfully declines.
- Full names of the guests attending — optional paragraph; include yourself if attending and only the names on your invitation.
- Number of guests attending — required whole number; include yourself if attending, 0 if declining.
- Dietary requirements — optional paragraph; name the guest for each requirement.
- A little note for the couple — optional paragraph.

No RSVP deadline is displayed until the couple chooses one. This simple form does not enforce a household's seat allocation or deduplicate responses. Compare names and counts against the invitation list in the private sheet.

## Settings for guests who do not use Google

- **Limit to 1 response:** off.
- **Collect email addresses:** do not collect. If an email question is added, use a normal text question rather than verified email collection.
- **File-upload questions:** none.
- **View results summary:** off.
- **Allow response editing:** on. Guests should save their personal edit-response link after submitting.
- **Show link to submit another response:** off.
- **Responder access:** anyone with the link. An organization's account policies can restrict public access; use a personal Google account if necessary.

Only the couple and anyone they explicitly add as collaborators should have editor or spreadsheet access. Do not publish the response spreadsheet to the web.

## Connect it to the website

Set `GOOGLE_FORM_URL` in `src/rsvp.js` to the published responder URL. Never use an editor URL, a response spreadsheet URL, or a `formResponse` submission endpoint. Then run `npm test` and `npm run build` and deploy through the existing GitHub Pages workflow.

With a full responder link, “Fill in your RSVP” expands the Google Form inside the invitation. Google is loaded only when a guest first opens the form. Closing and reopening it keeps the iframe mounted to preserve their entries within the current page session. A direct link remains available if the embedded form does not display. Google handles submission, validation, and confirmation; the website does not infer success from an iframe load.

## End-to-end check after connection

1. Visit the invitation on a phone and desktop and reach RSVP from the navigation.
2. Open the form in the invitation and via the new-tab fallback while signed out of Google.
3. Submit a clearly labeled test response. Check the Google confirmation and confirm the same response appears in the private spreadsheet.
4. Save the edit-response link, revise the response, and verify the existing sheet row updates.
5. Check that the form does not expose a response summary or the private response sheet.
6. Identify the test row to the couple so it is excluded from the real attendance totals.

## References

- Google sharing and sign-in settings: https://support.google.com/docs/answer/2839588?hl=en
- Linking a response spreadsheet: https://support.google.com/docs/answer/2917686
- Apps Script Forms API used by the setup script: https://developers.google.com/apps-script/reference/forms/form

