class Resep {
  final int? id;
  final String nama;
  final String bahan;
  final String caraMembuat;
  String? gambar;

  Resep({
    this.id,
    required this.nama,
    required this.bahan,
    required this.caraMembuat,
    this.gambar,
  });

  factory Resep.fromJson(Map<String, dynamic> json) {
    return Resep(
      id: json['id'],
      nama: json['nama'],
      bahan: json['bahan'],
      caraMembuat: json['cara_membuat'],
      gambar: json['gambar'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'nama': nama,
      'bahan': bahan,
      'cara_membuat': caraMembuat,
      if (gambar != null) 'gambar': gambar,
    };
  }
}
