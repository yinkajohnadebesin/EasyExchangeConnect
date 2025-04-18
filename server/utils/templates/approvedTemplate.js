const ApprovedTemplate = ({ name, university }) => `
  <div style="font-family: 'Nunito', sans-serif; padding: 20px;">
    <h2 style="color: #1d4ed8;">🎉 Congratulations ${name}!</h2>
    <p>Your application to <strong>${university}</strong> has been <strong>approved</strong> for the EasyExchangeConnect programme.</p>
    <p>Please complete the attached form and send it back to us at your earliest convenience.</p>
    <p>We’re excited to have you on board!</p>
    <br/>
    <p>Best regards,</p>
    <p style="font-weight: bold;">The EasyExchangeConnect Team</p>
  </div>
`;

module.exports = ApprovedTemplate;
