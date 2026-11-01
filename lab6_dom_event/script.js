
const form = document.getElementById("workshopForm");

const nama = document.getElementById("nama");
const email = document.getElementById("email");
const sesi = document.getElementById("sesi");
const hasilSesi = document.getElementById("hasilSesi");
const catatan = document.getElementById("catatan");

const message = document.getElementById("message");
const resetBtn = document.getElementById("resetBtn");

const infoWorkshop = document.getElementById("infoWorkshop");
const toggleBtn = document.getElementById("toggleBtn");


// Menghitung karakter nama dan catatan
function updateCounter() {
    document.getElementById("charCount").textContent =
        nama.value.length;

    document.getElementById("catatanCount").textContent =
        catatan.value.length;
}

// Memperbarui ringkasan secara langsung
function updatePreview() {
    document.getElementById("previewNama").textContent =
        nama.value.trim() || "Belum diisi";

    document.getElementById("previewEmail").textContent =
        email.value.trim() || "Belum diisi";

    document.getElementById("previewSesi").textContent =
        sesi.value || "Belum dipilih";

    document.getElementById("previewCatatan").textContent =
        catatan.value.trim() || "Tidak ada";
}

// Menampilkan atau menghapus pesan kesalahan
function showError(field, errorId, text) {
    document.getElementById(errorId).textContent = text;
    field.classList.toggle("invalid", Boolean(text));
    field.setAttribute("aria-invalid", Boolean(text));
}

// Validasi seluruh input
function validateForm() {
    let valid = true;

    const namaValue = nama.value.trim();
    const emailValue = email.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let namaError = "";
    let emailError = "";
    let sesiError = "";

    if (namaValue.length < 3) {
        namaError = "Nama minimal 3 karakter.";
    } else if (namaValue.length > 60) {
        namaError = "Nama maksimal 60 karakter.";
    }

    if (!emailValue) {
        emailError = "Email wajib diisi.";
    } else if (!emailPattern.test(emailValue)) {
        emailError = "Format email tidak valid.";
    }

    if (!sesi.value) {
        sesiError = "Silakan pilih sesi workshop.";
    }

    showError(nama, "namaError", namaError);
    showError(email, "emailError", emailError);
    showError(sesi, "sesiError", sesiError);

    if (namaError || emailError || sesiError) {
        valid = false;
    }

    return valid;
}

// Event input: memperbarui hitungan dan ringkasan
[nama, email, catatan].forEach(function (field) {
    field.addEventListener("input", function () {
        updateCounter();
        updatePreview();

        // Hapus pesan lama ketika pengguna mengedit data
        message.textContent = "";
        message.className = "message";

        // Validasi ulang jika sebelumnya sudah ada kesalahan
        if (field === nama &&
            document.getElementById("namaError").textContent) {
            showError(
                nama,
                "namaError",
                nama.value.trim().length < 3
                    ? "Nama minimal 3 karakter."
                    : nama.value.trim().length > 60
                        ? "Nama maksimal 60 karakter."
                        : ""
            );
        }

        if (field === email &&
            document.getElementById("emailError").textContent) {
            const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            showError(
                email,
                "emailError",
                !email.value.trim()
                    ? "Email wajib diisi."
                    : !pattern.test(email.value.trim())
                        ? "Format email tidak valid."
                        : ""
            );
        }
    });
});

// Event change: saat sesi berubah
sesi.addEventListener("change", function () {
    updatePreview();
    message.textContent = "";
    message.className = "message";

    if (document.getElementById("sesiError").textContent) {
        showError(
            sesi,
            "sesiError",
            sesi.value ? "" : "Silakan pilih sesi workshop."
        );
    }
});

sesi.addEventListener("change", function () {
    hasilSesi.textContent = sesi.value
        ? "Sesi yang dipilih: " + sesi.value
        : "Sesi yang dipilih: Belum ada";
});

// Event submit: validasi dan pesan hasil
form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateForm()) {
        message.textContent =
            "Pendaftaran berhasil! Data kamu telah divalidasi.";
        message.className = "message success";
    } else {
        message.textContent =
            "Pendaftaran gagal. Periksa kembali data kamu.";
        message.className = "message failure";

        const firstInvalid = form.querySelector(".invalid");
        if (firstInvalid) {
            firstInvalid.focus();
        }
    }
});

// Event click: reset seluruh form
resetBtn.addEventListener("click", function () {
    form.reset();

    ["namaError", "emailError", "sesiError"].forEach(function (id) {
        document.getElementById(id).textContent = "";
    });

    [nama, email, sesi].forEach(function (field) {
        field.classList.remove("invalid");
        field.removeAttribute("aria-invalid");
    });

    message.textContent = "";
    message.className = "message";

    updateCounter();
    updatePreview();
});


toggleBtn.addEventListener("click", function () {
    infoWorkshop.classList.toggle("hidden");

    if (infoWorkshop.classList.contains("hidden")) {
        toggleBtn.textContent = "Tampilkan Informasi";
    } else {
        toggleBtn.textContent = "Sembunyikan Informasi";
    }
});
// Inisialisasi tampilan
updateCounter();
updatePreview();
