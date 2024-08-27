const axios = require('axios');

exports.getDatasertifikat = async (req, res) => {
  try {
    const { id_apph, nama_admin } = req.admin;
    const response = await axios.get('https://solusiadil-api.vercel.app/sertifikat');
    const sertifikatData = Object.values(response.data);

    res.render('sertifikat/datasertifikat', { sertifikatData, id_apph, nama_admin });
  } catch (error) {
    console.error('Error fetching sertifikat data:', error);
    res.status(500).send('Error fetching sertifikat data');
  }
};

exports.sertifikatlihatprosesData = async (req, res) => {
  try {
    const id_sertifikat = req.query.id_sertifikat;
    const { id_apph, nama_admin } = req.admin;
    const response = await axios.get(`https://solusiadil-api.vercel.app/sertifikat/idsertifikat/${id_sertifikat}`);
    const sertifikatData = response.data;
    const formattedsertifikat = Object.values(sertifikatData)[0];
    if (!formattedsertifikat) {
      throw new Error('Data sertifikat tidak ditemukan');
    }
    res.render('sertifikat/prosessertifikat', { sertifikat: formattedsertifikat, id_apph, nama_admin });

  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan dalam mengambil data sertifikat.');
  }
};

exports.sertifikatlihatData = async (req, res) => {
  try {
    const id_sertifikat = req.query.id_sertifikat;
    const { id_apph, nama_admin } = req.admin;
    const response = await axios.get(`https://solusiadil-api.vercel.app/sertifikat/idsertifikat/${id_sertifikat}`);
    const sertifikatData = response.data;
    const formattedsertifikat = Object.values(sertifikatData)[0];
    if (!formattedsertifikat) {
      throw new Error('Data sertifikat tidak ditemukan');
    }
    res.render('sertifikat/lihatsertifikat', { sertifikat: formattedsertifikat, id_apph, nama_admin });

  } catch (error) {
    console.error(error);
    res.status(500).send('Terjadi kesalahan dalam mengambil data sertifikat.');
  }
};

exports.sertifikatprosesData = async (req, res) => {
  try {
    const sertifikatId = req.body.id_sertifikat;
    const updatedData = {
      id_sertifikat: req.body.id_sertifikat, 
      id_apph : req.body.id_apph, 
      nama_apph : req.body.nama_apph, 
      tanggal : req.body.tanggal, 
      keterangan: req.body.keterangan, 
      status: req.body.status,
    };
    await axios.put(`https://solusiadil-api.vercel.app/sertifikat/idsertifikat/${sertifikatId}`, updatedData);
    res.redirect('datasertifikat');
  } catch (error) {
    console.error('Error Update sertifikat:', error);
    res.status(500).send('Error Update sertifikat');
  }
};

exports.sertifikathapusData = async (req, res) => {
    try {
      const id_sertifikat = req.query.id;
      const { id_apph, nama_admin } = req.admin;
      const response = await axios.delete(`https://solusiadil-api.vercel.app/sertifikat/idsertifikat/${id_sertifikat}`);
      
      if (response.status === 200) {
        res.redirect('/datasertifikat');
      } else {
        throw new Error('Gagal menghapus data');
      }
  
    } catch (error) {
      console.error(error);
      res.status(500).send('Terjadi kesalahan dalam menghapus data sertifikat.');
    }
  };

  exports.sertifikatCetak = async (req, res) => {
    try {
      const id_sertifikat = req.query.id;
      const sertifikatResponse = await axios.get(
        `https://solusiadil-api.vercel.app/sertifikat/idsertifikat/${id_sertifikat}`
      );
      const sertifikatData = sertifikatResponse.data;
      const formattedSertifikat = Object.values(sertifikatData)[0];
      if (!formattedSertifikat) {
        throw new Error("Data sertifikat tidak ditemukan");
      }
      const id_apph = formattedSertifikat.id_apph;
      const konsultasiResponse = await axios.get(
        `https://solusiadil-api.vercel.app/konsultasi/`
      );
      const konsultasiData = konsultasiResponse.data;
      const jumlahKonsultasi = Object.values(konsultasiData).filter(
        konsultasi => konsultasi.id_apph === id_apph && 
                      (konsultasi.status === 'Selesai' || konsultasi.status === 'Gagal')
      ).length;
      const blogsResponse = await axios.get(
        `https://solusiadil-api.vercel.app/blogs/`
      );
      const blogsData = blogsResponse.data;
      const jumlahBlogs = Object.values(blogsData).filter(
        blog => blog.id_apph === id_apph && blog.status === 'Diterima'
      ).length;
      res.render("sertifikat/cetaksertifikat", { 
        sertifikat: formattedSertifikat,
        jumlahKonsultasi: jumlahKonsultasi,
        jumlahBlogs: jumlahBlogs
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Terjadi kesalahan dalam mengambil data sertifikat.");
    }
  };