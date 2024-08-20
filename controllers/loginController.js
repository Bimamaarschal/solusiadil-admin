const axios = require('axios');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret_key';

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
const randomStringLength = 50;
const randomString = generateRandomString(randomStringLength);


exports.loginadmin = async (req, res) => {
  try {
    const { id_apph, password } = req.body;
    const response = await axios.post(
      'https://solusiadil-api.vercel.app/admin/login',
      { id_apph, password }
    );

    if (response.data.message === 'Login successful' && response.data.adminData) {
      const adminData = response.data.adminData;

      const token = jwt.sign(
        {
          nama_admin: adminData.nama_admin,
          id_apph: adminData.id_apph,
          nik: adminData.nik
        },
        JWT_SECRET,
        { expiresIn: '3h' }
      );
      res.cookie('token', token, { httpOnly: true });
      res.redirect(`/beranda?bima-safety-key=${randomString}&${id_apph}&${randomString}`);
    } else {
      res.send(`
        <html>
          <head>
            <title>Login Gagal</title>
            <script>
              alert("admin Gagal Login karena data pengguna tidak valid");
              window.location.href = "/masuk";
            </script>
          </head>
          <body>
            <p>Kembalikan...</p>
          </body>
        </html>
      `);
    }
  } catch (error) {
    console.error("Error:", error);
    res.send(`
      <html>
        <head>
          <title>Login Gagal</title>
          <script>
            alert("admin Gagal Login karena ${error.message}");
            window.location.href = "/masuk";
          </script>
        </head>
        <body>
          <p>Kembalikan...</p>
        </body>
      </html>
    `);
  }
};

exports.logoutadmin = (req, res) => {
  res.clearCookie('token');
  res.redirect("/");
};
