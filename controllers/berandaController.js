exports.getBeranda = (req, res) => {
    if (req.admin) {
      const nama_admin = req.admin.nama_admin;
      const idadmin = req.admin.id_apph;
      const Nik = req.admin.nik;
      res.render('beranda', { nama_admin: nama_admin, idadmin: idadmin, Nik: Nik });
    } else {
      res.redirect('/masuk');
    }
  };