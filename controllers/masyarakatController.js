const axios = require("axios");

exports.masyarakatbaruData = async (req, res) => {
  const {
    alamat,
    doc_pendukung = "kosong",
    email,
    id_masyarakat,
    jumlah_kontribusi = "0",
    keterangan,
    nama_masyarakat,
    nik,
    password,
    pekerjaan,
    pendidikan,
    poin = "0",
  } = req.body;

  try {
    const response = await axios.post(
      "https://solusiadil-api.vercel.app/users",
      {
        alamat,
        doc_pendukung,
        email,
        id_masyarakat,
        jumlah_kontribusi,
        keterangan,
        nama_masyarakat,
        nik,
        password,
        pekerjaan,
        pendidikan,
        poin,
      }
    );

    if (response.status === 201) {
      res.send(`
        <html>
          <head>
            <title>masyarakat Data Success</title>
            <script>
              alert("masyarakat berhasil diajukan, akan berpindah ke halaman Awal");
              window.location.href = "/datamasyarakat";
            </script>
          </head>
          <body>
            <p>Kembalikan..</p>
          </body>
        </html>
      `);
    } else {
      throw new Error("Gagal menyimpan masyarakat Anda");
    }
  } catch (error) {
    console.error("Error:", error);
    res.send(`
      <html>
        <head>
          <title>masyarakat Gagal</title>
          <script>
            alert("Gagal mengirim data karena ${error.message}");
            window.location.href = "/tulismasyarakat";
          </script>
        </head>
        <body>
          <p>Kembalikan...</p>
        </body>
      </html>
    `);
  }
};

exports.updatemasyarakatData = async (req, res) => {
  const {
    alamat, 
    email, 
    foto = "0", 
    id_masyarakat, 
    jenis_kelamin, 
    nama, nik, 
    no_tlp, 
    password, 
    tgl_lahir,
  } = req.body;
  try {
    const response = await axios.put(
      `https://solusiadil-api.vercel.app/users/idmasyarakat/${id_masyarakat}`,
      {
        alamat, 
        email, 
        foto, 
        id_masyarakat, 
        jenis_kelamin, 
        nama, 
        nik, 
        no_tlp,
         password, 
         tgl_lahir,
      }
    );

    if (response.status === 200) {
      res.send(`
        <html>
          <head>
            <title>masyarakat Data Update Success</title>
            <script>
              alert("Data masyarakat berhasil diperbarui, akan berpindah ke halaman Awal");
              window.location.href = "/datamasyarakat";
            </script>
          </head>
          <body>
            <p>Kembalikan..</p>
          </body>
        </html>
      `);
    } else {
      throw new Error("Gagal memperbarui data masyarakat Anda");
    }
  } catch (error) {
    console.error("Error:", error);
    res.send(`
      <html>
        <head>
          <title>masyarakat Update Failed</title>
          <script>
            alert("Gagal memperbarui data karena ${error.message}");
            window.location.href = "/editmasyarakat?id_masyarakat=${id_masyarakat}";
          </script>
        </head>
        <body>
          <p>Kembalikan...</p>
        </body>
      </html>
    `);
  }
};

exports.getDatamasyarakat = async (req, res) => {
  try {
    const { id_masyarakat, nama_admin } = req.admin;
    const response = await axios.get("https://solusiadil-api.vercel.app/users");
    const masyarakatData = Object.values(response.data);

    res.render("masyarakat/datamasyarakat", { masyarakatData, id_masyarakat, nama_admin });
  } catch (error) {
    console.error("Error fetching masyarakat data:", error);
    res.status(500).send("Error fetching masyarakat data");
  }
};

exports.getTulismasyarakat = async (req, res) => {
  try {
    const { id_masyarakat, nama_admin } = req.admin;
    const response = await axios.get("https://solusiadil-api.vercel.app/users");
    const masyarakat = Object.values(response.data);

    res.render("masyarakat/tulismasyarakat", { masyarakat, id_masyarakat, nama_admin });
  } catch (error) {
    console.error("Error fetching masyarakat data:", error);
    res.status(500).send("Error fetching masyarakat data");
  }
};

exports.masyarakatlihatData = async (req, res) => {
  try {
    const id_panggil = req.query.id;
    const { id_masyarakat, nama_admin } = req.admin;
    const response = await axios.get(
      `https://solusiadil-api.vercel.app/users/idmasyarakat/${id_panggil}`
    );
    const masyarakatData = response.data;
    const formattedmasyarakat = Object.values(masyarakatData)[0];
    if (!formattedmasyarakat) {
      throw new Error("Data masyarakat tidak ditemukan");
    }
    res.render("masyarakat/lihatmasyarakat", { masyarakat: formattedmasyarakat, id_masyarakat, nama_admin });
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan dalam mengambil data masyarakat.");
  }
};

exports.masyarakateditData = async (req, res) => {
  try {
    const id_panggil = req.query.id;
    const { id_masyarakat, nama_admin } = req.admin;
    const response = await axios.get(
      `https://solusiadil-api.vercel.app/users/idmasyarakat/${id_panggil}`
    );
    const masyarakatData = response.data;
    const formattedmasyarakat = Object.values(masyarakatData)[0];
    if (!formattedmasyarakat) {
      throw new Error("Data masyarakat tidak ditemukan");
    }
    res.render("masyarakat/editmasyarakat", { masyarakat: formattedmasyarakat, id_masyarakat, nama_admin });
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan dalam mengambil data masyarakat.");
  }
};

exports.masyarakatbacaData = async (req, res) => {
  try {
    const id_panggil = req.query.id_masyarakat;
    const { id_masyarakat, nama_admin } = req.admin;
    const response = await axios.get(
      `https://solusiadil-api.vercel.app/users/idmasyarakat/${id_panggil}`
    );
    const response2 = await axios.get("https://solusiadil-api.vercel.app/users");
    const masyarakatData2 = Object.values(response2.data);
    const masyarakatData = response.data;
    const formattedmasyarakat = Object.values(masyarakatData)[0];
    if (!formattedmasyarakat) {
      throw new Error("Data masyarakat tidak ditemukan");
    }
    res.render("masyarakat/bacamasyarakat", {
      masyarakat: formattedmasyarakat,
      masyarakatData2,
      id_masyarakat,
      nama_admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan dalam mengambil data masyarakat.");
  }
};

exports.masyarakathapusData = async (req, res) => {
  try {
    const id_panggil = req.query.id;
    const { id_masyarakat, nama_admin } = req.admin;
    const response = await axios.delete(
      `https://solusiadil-api.vercel.app/users/idmasyarakat/${id_panggil}`
    );

    if (response.status === 200) {
      res.redirect("/datamasyarakat");
    } else {
      throw new Error("Gagal menghapus data");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan dalam menghapus data masyarakat.");
  }
};
