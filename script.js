function hitung() {
  let jenis = document.getElementById("jenis").value;
  let a1 = parseFloat(document.getElementById("a1").value);
  let d = parseFloat(document.getElementById("d").value);
  let n = parseInt(document.getElementById("n").value);

  if (isNaN(a1) || isNaN(d) || isNaN(n) || n <= 0) {
    alert("Isi semua input dengan benar!");
    return;
  }

  let an, Sn, sukuList = [], rumus = "", rumusSn = "", rumusUmum = "";

  if (jenis === "aritmetika") {
    // Perhitungan
    an = a1 + (n - 1) * d;
    Sn = (n / 2) * (2 * a1 + (n - 1) * d);

    // Rumus utama
    rumusUmum = `
      <p><b>Rumus Umum:</b></p>
      <p>aₙ = a₁ + (n-1)d</p>
      <p>Sₙ = <span class="fraction"><span class="top">n</span><span class="bottom">2</span></span>(2a₁ + (n-1)d)</p>
    `;

    // Rumus substitusi
    rumus = `aₙ = ${a1} + (${n}-1)(${d}) = ${an}`;
    rumusSn = `Sₙ = <span class="fraction"><span class="top">${n}</span><span class="bottom">2</span></span>(2×${a1} + (${n}-1)×${d}) = ${Sn}`;

    // Daftar suku
    for (let i = 1; i <= n; i++) {
      sukuList.push(a1 + (i - 1) * d);
    }

  } else {
    // Perhitungan
    an = a1 * Math.pow(d, n - 1);
    Sn = d === 1 ? a1 * n : a1 * (1 - Math.pow(d, n)) / (1 - d);

    // Rumus utama
    rumusUmum = `
      <p><b>Rumus Umum:</b></p>
      <p>aₙ = a₁ × r^(n-1)</p>
      <p>Sₙ = <span class="fraction"><span class="top">a₁(1-rⁿ)</span><span class="bottom">1-r</span></span></p>
    `;

    // Rumus substitusi
    rumus = `aₙ = ${a1} × ${d}^(${n}-1) = ${an}`;
    rumusSn = d === 1 
      ? `Sₙ = ${a1} × ${n} = ${Sn}`
      : `Sₙ = <span class="fraction"><span class="top">${a1}(1-${d}^${n})</span><span class="bottom">1-${d}</span></span> = ${Sn}`;

    // Daftar suku
    for (let i = 1; i <= n; i++) {
      sukuList.push(a1 * Math.pow(d, i - 1));
    }
  }

  // tampilkan rumus umum
  document.getElementById("rumus-umum").innerHTML = rumusUmum;

  // tampilkan hasil
  document.getElementById("hasil").innerHTML = `
    <p><b>Suku ke-${n} (aₙ):</b> ${an}</p>
    <p><b>Perhitungan aₙ:</b> ${rumus}</p>
    <p><b>Jumlah deret Sₙ:</b> ${Sn}</p>
    <p><b>Perhitungan Sₙ:</b> ${rumusSn}</p>
  `;

  // tampilkan tabel
  let tbody = document.querySelector("#tabel-suku tbody");
  tbody.innerHTML = "";
  sukuList.forEach((val, i) => {
    let row = `<tr><td>${i+1}</td><td>${val}</td></tr>`;
    tbody.innerHTML += row;
  });
}

function resetForm() {
  document.getElementById("a1").value = "";
  document.getElementById("d").value = "";
  document.getElementById("n").value = "";
  document.getElementById("rumus-umum").innerHTML = "";
  document.getElementById("hasil").innerHTML = "<p>Masukkan data untuk melihat hasil...</p>";
  document.querySelector("#tabel-suku tbody").innerHTML = "";
}
