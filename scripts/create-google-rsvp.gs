/**
 * Run prepareWeddingRsvp in your own Google Apps Script project.
 * Creates a draft form and its private response spreadsheet in your account.
 * Review the form, publish it for anyone with the link, then share its responder
 * link with the website editor. Do not share the editor or spreadsheet link.
 */
function prepareWeddingRsvp() {
  const properties = PropertiesService.getUserProperties();
  const savedFormId = properties.getProperty('weddingRsvpFormId');
  if (savedFormId) {
    const existing = FormApp.openById(savedFormId);
    console.log('Your existing RSVP form (edit): ' + existing.getEditUrl());
    console.log('Guest link (publish before sharing): ' + existing.getPublishedUrl());
    const destination = existing.getDestinationId();
    if (destination) console.log('Private response sheet: ' + SpreadsheetApp.openById(destination).getUrl());
    return;
  }

  const form = FormApp.create('Jiv & Rochelle — Wedding RSVP', false);
  // Retain the draft immediately so another run never creates duplicate forms.
  properties.setProperty('weddingRsvpFormId', form.getId());
  console.log('Draft form (edit): ' + form.getEditUrl());

  form.setDescription('Sunday, February 7, 2027 · Cebu\n\nYour presence would mean the world to us. Please respond for the guests named on your invitation. Your answers will be used by the couple to plan the celebration.');
  form.setCollectEmail(false);
  form.setLimitOneResponsePerUser(false);
  form.setPublishingSummary(false);
  form.setAllowResponseEdits(true);
  form.setShowLinkToRespondAgain(false);
  form.setShuffleQuestions(false);
  form.setConfirmationMessage('Thank you for letting us know! Your RSVP has been received. With love, Jiv & Rochelle. To make changes, save the Edit your response link below.');

  form.addTextItem()
    .setTitle('Your full name')
    .setHelpText('One response per invited household, please.')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('Will you be joining us?')
    .setChoiceValues(['Joyfully accepts', 'Regretfully declines'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Full names of the guests attending')
    .setHelpText('Include yourself if attending, and only the guests named on your invitation. Leave blank if unable to attend.');

  form.addTextItem()
    .setTitle('Number of guests attending')
    .setHelpText('Include yourself if attending. Enter 0 if unable to attend. Please stay within the number of guests on your invitation.')
    .setValidation(FormApp.createTextValidation()
      .requireTextMatchesPattern('^(0|[1-9][0-9]*)$')
      .setHelpText('Enter a whole number, such as 0, 1, or 2.')
      .build())
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('Dietary requirements')
    .setHelpText('Optional. Please include the name of the guest for each requirement.');

  form.addParagraphTextItem()
    .setTitle('A little note for the couple')
    .setHelpText('Optional. We would love to hear from you.');

  const sheet = SpreadsheetApp.create('Jiv & Rochelle — RSVP responses');
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  console.log('Private response sheet: ' + sheet.getUrl());
  console.log('Guest link (publish before sharing): ' + form.getPublishedUrl());
  console.log('Next: review the draft, publish for anyone with the link, and test the guest link in a signed-out/private window.');
}
