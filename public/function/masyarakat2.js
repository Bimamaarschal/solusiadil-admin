document.addEventListener("DOMContentLoaded", function() {
  const statusInput = document.getElementById("status");
  const statusValue = statusInput.value.toLowerCase();

  switch (statusValue) {
      case "menunggu":
          statusInput.classList.add("bg-warning");
          break;
      case "diproses":
          statusInput.classList.add("bg-success");
          break;
      case "selesai":
          statusInput.classList.add("bg-primary");
          break;
      case "gagal":
          statusInput.classList.add("bg-danger");
          break;
      default:
          break;
  }
});

function validateJudul(input) {
  const regex = /[^a-zA-Z\s]/g;
  if (regex.test(input.value)) {
      input.value = input.value.replace(regex, '');
      document.getElementById('error-message-judul').style.display = 'block';
  } else {
      document.getElementById('error-message-judul').style.display = 'none';
  }
  if (input.value.length > 150) {
      input.value = input.value.slice(0, 150);
      document.getElementById('error-message-judul').style.display = 'block';
  }
}

function validateNamaApph(input) {
    if (input.value.trim() === '') {
        document.getElementById('error-message-nama_apph').style.display = 'block';
    } else {
        document.getElementById('error-message-nama_apph').style.display = 'none';
    }
}

function validateNik(input) {
    const regex = /^\d+$/; // Validasi hanya angka
    if (!regex.test(input.value) || input.value.trim() === '') {
        document.getElementById('error-message-nik').style.display = 'block';
    } else {
        document.getElementById('error-message-nik').style.display = 'none';
    }
}

function validateEmail(input) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Format email
    if (!regex.test(input.value)) {
        document.getElementById('error-message-email').style.display = 'block';
    } else {
        document.getElementById('error-message-email').style.display = 'none';
    }
}

function validateAlamat(input) {
    if (input.value.trim() === '') {
        document.getElementById('error-message-alamat').style.display = 'block';
    } else {
        document.getElementById('error-message-alamat').style.display = 'none';
    }
}
function validateAlamat(input) {
    if (input.value.trim() === '') {
        document.getElementById('error-message-alamat').style.display = 'block';
    } else {
        document.getElementById('error-message-alamat').style.display = 'none';
    }
}
function validatePendidikan(input) {
    if (input.value.trim() === '') {
        document.getElementById('error-message-pendidikan').style.display = 'block';
    } else {
        document.getElementById('error-message-pendidikan').style.display = 'none';
    }
}
function validatePekerjaan(input) {
    if (input.value.trim() === '') {
        document.getElementById('error-message-pekerjaan').style.display = 'block';
    } else {
        document.getElementById('error-message-pekerjaan').style.display = 'none';
    }
}
function validateJumlahKontribusi(input) {
    const regex = /^\d+$/; // Hanya angka
    if (!regex.test(input.value) || input.value.trim() === '') {
        document.getElementById('error-message-jumlah_kontribusi').style.display = 'block';
    } else {
        document.getElementById('error-message-jumlah_kontribusi').style.display = 'none';
    }
}
function validateKeterangan(input) {
    if (input.value.length > 550) {
        input.value = input.value.slice(0, 550);
        document.getElementById('error-message-keterangan').style.display = 'block';
    } else {
        document.getElementById('error-message-keterangan').style.display = 'none';
    }
}
function validatePoin(input) {
    const regex = /^\d+$/; // Hanya angka
    if (!regex.test(input.value) || input.value.trim() === '') {
        document.getElementById('error-message-poin').style.display = 'block';
    } else {
        document.getElementById('error-message-poin').style.display = 'none';
    }
}
function validatePassword(input) {
    if (input.value.trim() === '') {
        document.getElementById('error-message-password').style.display = 'block';
    } else {
        document.getElementById('error-message-password').style.display = 'none';
    }
}


function validateUU(input) {
  if (input.value.length > 550) {
      input.value = input.value.slice(0, 550);
      document.getElementById('error-message-undangundang').style.display = 'block';
  } else {
      document.getElementById('error-message-undangundang').style.display = 'none';
  }
}
function validateReferensi(input) {
  if (input.value.length > 550) {
      input.value = input.value.slice(0, 550);
      document.getElementById('error-message-keterangan').style.display = 'block';
  } else {
      document.getElementById('error-message-keterangan').style.display = 'none';
  }
}

function setTodayDate() {
    var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    var months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    var today = new Date();
    var dayName = days[today.getDay()];
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = months[today.getMonth()];
    var yyyy = today.getFullYear();

    var formattedDate = dayName + ', ' + dd + ' ' + mm + ' ' + yyyy;
    document.getElementById("tanggal").value = formattedDate;
}

document.addEventListener("DOMContentLoaded", setTodayDate);