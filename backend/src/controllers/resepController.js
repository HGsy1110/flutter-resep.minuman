const Resep = require('../models/Resep');
const path = require('path');

const resepController = {
  // Mendapatkan semua resep
  getAllResep: async (req, res) => {
    try {
      const resep = await Resep.findAll();
      res.json(resep);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Mendapatkan resep berdasarkan ID
  getResepById: async (req, res) => {
    try {
      const resep = await Resep.findByPk(req.params.id);
      if (resep) {
        res.json(resep);
      } else {
        res.status(404).json({ message: 'Resep tidak ditemukan' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Membuat resep baru
  createResep: async (req, res) => {
    try {
      const { nama, bahan, cara_membuat } = req.body;
      const gambar = req.file ? req.file.filename : null;

      const resep = await Resep.create({
        nama,
        bahan,
        cara_membuat,
        gambar,
      });

      res.status(201).json(resep);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Mengupdate resep
  updateResep: async (req, res) => {
    try {
      const { nama, bahan, cara_membuat } = req.body;
      const gambar = req.file ? req.file.filename : undefined;

      const resep = await Resep.findByPk(req.params.id);
      if (!resep) {
        return res.status(404).json({ message: 'Resep tidak ditemukan' });
      }

      const updateData = {
        nama: nama || resep.nama,
        bahan: bahan || resep.bahan,
        cara_membuat: cara_membuat || resep.cara_membuat,
      };

      if (gambar) {
        updateData.gambar = gambar;
      }

      await resep.update(updateData);
      res.json(resep);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // Menghapus resep
  deleteResep: async (req, res) => {
    try {
      const resep = await Resep.findByPk(req.params.id);
      if (!resep) {
        return res.status(404).json({ message: 'Resep tidak ditemukan' });
      }

      await resep.destroy();
      res.json({ message: 'Resep berhasil dihapus' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = resepController;
