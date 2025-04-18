const RejectedTemplate = ({ name, university }) => `
  <div style="font-family: 'Nunito', sans-serif; padding: 20px;">
    <h2 style="color: #dc2626;">Dear ${name},</h2>
    <p>Unfortunately, your application to <strong>${university}</strong> has not been successful at this time.</p>
    <p>We understand this may be disappointing, but we encourage you to apply again in the future or explore other exchange opportunities.</p>
    <br/>
    <p>Thank you for your interest and effort.</p>
    <p>Warm regards,</p>
    <p style="font-weight: bold;">The EasyExchangeConnect Team</p>
  </div>
`;

module.exports = RejectedTemplate;
