const axios = require("axios");

exports.apphbaruData = async (req, res) => {
  const {
    alamat,
    doc_pendukung = "kosong",
    email,
    id_apph,
    jumlah_kontribusi = "0",
    keterangan,
    nama_apph,
    nik,
    password,
    pekerjaan,
    pendidikan,
    poin = "0",
  } = req.body;

  try {
    const response = await axios.post(
      "https://solusiadil-api.vercel.app/apph",
      {
        alamat,
        doc_pendukung,
        email,
        id_apph,
        jumlah_kontribusi,
        keterangan,
        nama_apph,
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
            <title>apph Data Success</title>
            <script>
              alert("apph berhasil diajukan, akan berpindah ke halaman Awal");
              window.location.href = "/dataapph";
            </script>
          </head>
          <body>
            <p>Kembalikan..</p>
          </body>
        </html>
      `);
    } else {
      throw new Error("Gagal menyimpan apph Anda");
    }
  } catch (error) {
    console.error("Error:", error);
    res.send(`
      <html>
        <head>
          <title>apph Gagal</title>
          <script>
            alert("Gagal mengirim data karena ${error.message}");
            window.location.href = "/tulisapph";
          </script>
        </head>
        <body>
          <p>Kembalikan...</p>
        </body>
      </html>
    `);
  }
};

exports.updateApphData = async (req, res) => {
  const {
    alamat,
    doc_pendukung = "kosong",
    email,
    id_apph,
    jumlah_kontribusi = "0",
    keterangan,
    nama_apph,
    nik,
    password,
    pekerjaan,
    pendidikan,
    poin = "0",
  } = req.body;

  try {
    const response = await axios.put(
      `https://solusiadil-api.vercel.app/apph/idapph/${id_apph}`,
      {
        alamat,
        doc_pendukung,
        email,
        id_apph,
        jumlah_kontribusi,
        keterangan,
        nama_apph,
        nik,
        password,
        pekerjaan,
        pendidikan,
        poin,
      }
    );

    if (response.status === 200) {
      res.send(`
        <html>
          <head>
            <title>apph Data Update Success</title>
            <script>
              alert("Data APPH berhasil diperbarui, akan berpindah ke halaman Awal");
              window.location.href = "/dataapph";
            </script>
          </head>
          <body>
            <p>Kembalikan..</p>
          </body>
        </html>
      `);
    } else {
      throw new Error("Gagal memperbarui data APPH Anda");
    }
  } catch (error) {
    console.error("Error:", error);
    res.send(`
      <html>
        <head>
          <title>apph Update Failed</title>
          <script>
            alert("Gagal memperbarui data karena ${error.message}");
            window.location.href = "/editapph?id_apph=${id_apph}";
          </script>
        </head>
        <body>
          <p>Kembalikan...</p>
        </body>
      </html>
    `);
  }
};

exports.getDataapph = async (req, res) => {
  try {
    const { id_apph, nama_admin } = req.admin;
    const response = await axios.get("https://solusiadil-api.vercel.app/apph");
    const apphData = Object.values(response.data);

    res.render("apph/dataapph", { apphData, id_apph, nama_admin });
  } catch (error) {
    console.error("Error fetching apph data:", error);
    res.status(500).send("Error fetching apph data");
  }
};

exports.getTulisapph = async (req, res) => {
  try {
    const { id_apph, nama_admin } = req.admin;
    const response = await axios.get("https://solusiadil-api.vercel.app/apph");
    const apph = Object.values(response.data);

    res.render("apph/tulisapph", { apph, id_apph, nama_admin });
  } catch (error) {
    console.error("Error fetching apph data:", error);
    res.status(500).send("Error fetching apph data");
  }
};

exports.apphlihatData = async (req, res) => {
  try {
    const id_panggil = req.query.id;
    const { id_apph, nama_admin } = req.admin;
    const response = await axios.get(
      `https://solusiadil-api.vercel.app/apph/idapph/${id_panggil}`
    );
    const apphData = response.data;
    const formattedapph = Object.values(apphData)[0];
    if (!formattedapph) {
      throw new Error("Data apph tidak ditemukan");
    }
    res.render("apph/lihatapph", { apph: formattedapph, id_apph, nama_admin });
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan dalam mengambil data apph.");
  }
};

exports.appheditData = async (req, res) => {
  try {
    const id_panggil = req.query.id;
    const { id_apph, nama_admin } = req.admin;
    const response = await axios.get(
      `https://solusiadil-api.vercel.app/apph/idapph/${id_panggil}`
    );
    const apphData = response.data;
    const formattedapph = Object.values(apphData)[0];
    if (!formattedapph) {
      throw new Error("Data apph tidak ditemukan");
    }
    res.render("apph/editapph", { apph: formattedapph, id_apph, nama_admin });
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan dalam mengambil data apph.");
  }
};

exports.apphbacaData = async (req, res) => {
  try {
    const id_panggil = req.query.id_apph;
    const { id_apph, nama_admin } = req.admin;
    const response = await axios.get(
      `https://solusiadil-api.vercel.app/apph/idapph/${id_panggil}`
    );
    const response2 = await axios.get("https://solusiadil-api.vercel.app/apph");
    const apphData2 = Object.values(response2.data);
    const apphData = response.data;
    const formattedapph = Object.values(apphData)[0];
    if (!formattedapph) {
      throw new Error("Data apph tidak ditemukan");
    }
    res.render("apph/bacaapph", {
      apph: formattedapph,
      apphData2,
      id_apph,
      nama_admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan dalam mengambil data apph.");
  }
};

exports.apphhapusData = async (req, res) => {
  try {
    const id_panggil = req.query.id;
    const { id_apph, nama_admin } = req.admin;
    const response = await axios.delete(
      `https://solusiadil-api.vercel.app/apph/idapph/${id_panggil}`
    );

    if (response.status === 200) {
      res.redirect("/dataapph");
    } else {
      throw new Error("Gagal menghapus data");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Terjadi kesalahan dalam menghapus data apph.");
  }
};
