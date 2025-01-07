import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import '../models/resep.dart';

class ResepService {
  static const String baseUrl =
      'http://localhost:3000/api/resep'; // untuk emulator Android
  // static const String baseUrl = 'http://localhost:3000/api/resep'; // untuk iOS simulator

  Future<List<Resep>> getResepList() async {
    final response = await http.get(Uri.parse(baseUrl));
    if (response.statusCode == 200) {
      List<dynamic> data = json.decode(response.body);
      return data.map((json) => Resep.fromJson(json)).toList();
    } else {
      throw Exception('Gagal mengambil data resep');
    }
  }

  Future<Resep> createResep(Resep resep, File? imageFile) async {
    var uri = Uri.parse(baseUrl);
    var request = http.MultipartRequest('POST', uri);

    request.fields['nama'] = resep.nama;
    request.fields['bahan'] = resep.bahan;
    request.fields['cara_membuat'] = resep.caraMembuat;

    if (imageFile != null) {
      request.files.add(await http.MultipartFile.fromPath(
        'gambar',
        imageFile.path,
      ));
    }

    var response = await request.send();
    var responseData = await response.stream.bytesToString();

    if (response.statusCode == 201) {
      return Resep.fromJson(json.decode(responseData));
    } else {
      throw Exception('Gagal membuat resep');
    }
  }

  Future<Resep> updateResep(int id, Resep resep, File? imageFile) async {
    var uri = Uri.parse('$baseUrl/$id');
    var request = http.MultipartRequest('PUT', uri);

    request.fields['nama'] = resep.nama;
    request.fields['bahan'] = resep.bahan;
    request.fields['cara_membuat'] = resep.caraMembuat;

    if (imageFile != null) {
      request.files.add(await http.MultipartFile.fromPath(
        'gambar',
        imageFile.path,
      ));
    }

    var response = await request.send();
    var responseData = await response.stream.bytesToString();

    if (response.statusCode == 200) {
      return Resep.fromJson(json.decode(responseData));
    } else {
      throw Exception('Gagal mengupdate resep');
    }
  }

  Future<void> deleteResep(int id) async {
    final response = await http.delete(Uri.parse('$baseUrl/$id'));
    if (response.statusCode != 200) {
      throw Exception('Gagal menghapus resep');
    }
  }
}
