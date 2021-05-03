const express = require("express");

const router = express.Router();
var path = require("path");
const Auth = require("./models/Auth");
const Menu = require("./models/Menu");
const Traditional = require("./models/Traditional");
const About = require("./models/About");
var jwt = require("jsonwebtoken");

var cors = require("cors");
router.use(cors());
//===========================================

// function untuk mengecek token
function isAuthenticated(req, res, next) {
    var token = req.header("auth-token"); //req.body.token || req.query.token || req.headers.authorization; // mengambil token di antara request
    if (token) {
        //jika ada token
        jwt.verify(token, "jwtsecret", function(err, decoded) {
            //jwt melakukan verify
            if (err) {
                // apa bila ada error
                res.json({ message: "Failed to authenticate token" }); // jwt melakukan respon
            } else {
                // apa bila tidak error
                req.decoded = decoded; // menyimpan decoded ke req.decoded
                next(); //melajutkan proses
            }
        });
    } else {
        // apa bila tidak ada token
        return res.status(403).send({ message: "No token provided." }); // melkukan respon kalau token tidak ada
    }
}

router.get("/", async(req, res) => {
    res.sendFile(path.join(__dirname + "/view/index.html"));
});
router.get("/admin", async(req, res) => {
    res.sendFile(path.join(__dirname + "/view/admin_dashboard.html"));
});
router.get("/login", async(req, res) => {
    res.sendFile(path.join(__dirname + "/view/login.html"));
});

// Router Untuk Authentication dan Token ====

// authentication login

router.post("/login_auth", async(req, res) => {
    //	select * from namatabel where username="" and password=""
    // if email exist
    const user = await Auth.findOne({
        username: req.body.username,
        pass: req.body.pass,
    });
    if (!user)
        return res.status(400).json({
            status: res.statusCode,
            message: "Gagal Login!",
        });
    else
        var token = jwt.sign({ username: req.body.username }, "jwtsecret", {
            algorithm: "HS256",
        });

    //res.json({message:'berhasil login', token: token});

    return res.status(200).json({
        token: token,
        status: res.statusCode,
        message: "Sukses Login!",
    });

    //  // check password
    //  const validPwd = await bcrypt.compare(req.body.password, user.password)
    //  if(!validPwd) return res.status(400).json({
    // 	 status: res.statusCode,
    // 	 message: 'Password Anda Salah!'
    //  })
});

router.get("/ambilpostadmin", isAuthenticated, async(req, res, next) => {
    const ambil = await Post.find();
    res.send(ambil);
});

//route untuk blog
//get all post
router.get("/ambilhome", async(req, res) => {
    const ambilhome = await Home.find();
    res.send(ambilhome);
});

//posting data
router.post("/ambilhome", async(req, res) => {
    const ambilhome = new Home({
        gambar: req.body.gambar,
        deskripsi: req.body.deskripsi,
    });
    await ambilhome.save();
    res.send(ambilhome);
});
// update salah satu data di database
router.patch("/ambilhome/:id", async(req, res) => {
    try {
        const ambilhome = await Home.findOne({ _id: req.params.id });

        if (req.body.gambar) {
            ambilhome.gambar = req.body.gambar;
        }

        if (req.body.deskripsi) {
            ambilhome.deskripsi = req.body.deskripsi;
        }

        await ambilhome.save();
        res.send(ambilhome);
    } catch {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});
//delete
router.delete("/ambilhome/:id", async(req, res) => {
    try {
        await Home.deleteOne({ _id: req.params.id });
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});
//ambil satu data
router.get("/ambilhome/:id", async(req, res) => {
    try {
        const ambilhome = await Home.findOne({ _id: req.params.id });
        res.send(ambilhome);
    } catch {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});

//route untuk menu
//get all post
router.get("/ambilmenu", async(req, res) => {
    const ambilmenu = await Menu.find();
    res.send(ambilmenu);
});

//posting data
router.post("/ambilmenu", async(req, res) => {
    const ambilmenu = new Menu({
        nama: req.body.nama,
        detail: req.body.detail,
        harga: req.body.harga,
        gambar: req.body.gambar,
    });
    await ambilmenu.save();
    res.send(ambilmenu);
});
// update salah satu data di database
router.patch("/ambilmenu/:id", async(req, res) => {
    try {
        const ambilmenu = await Menu.findOne({ _id: req.params.id });

        if (req.body.nama) {
            ambilmenu.nama = req.body.nama;
        }
        if (req.body.detail) {
            ambilmenu.detail = req.body.detail;
        }
        if (req.body.harga) {
            ambilmenu.harga = req.body.harga;
        }

        if (req.body.gambar) {
            ambilmenu.harga = req.body.gambar;
        }

        await ambilmenu.save();
        res.send(ambilmenu);
    } catch {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});
//delete
router.delete("/ambilmenu/:id", async(req, res) => {
    try {
        await Menu.deleteOne({ _id: req.params.id });
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});
//ambil satu data
router.get("/ambilmenu/:id", async(req, res) => {
    try {
        const ambilmenu = await Menu.findOne({ _id: req.params.id });
        res.send(ambilmenu);
    } catch {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});

//route untuk traditional
//get all post
router.get("/ambiltraditional", async(req, res) => {
    const ambiltraditional = await Traditional.find();
    res.send(ambiltraditional);
});

//posting data
router.post("/ambiltraditional", async(req, res) => {
    const ambiltraditional = new Traditional({
        nama: req.body.nama,
        detail: req.body.detail,
        harga: req.body.harga,
        gambar: req.body.gambar,
    });
    await ambiltraditional.save();
    res.send(ambiltraditional);
});
// update salah satu data di database
router.patch("/ambiltraditional/:id", async(req, res) => {
    try {
        const ambiltraditional = await Traditional.findOne({ _id: req.params.id });

        if (req.body.nama) {
            ambiltraditional.nama = req.body.nama;
        }
        if (req.body.detail) {
            ambiltraditional.detail = req.body.detail;
        }
        if (req.body.harga) {
            ambiltraditional.harga = req.body.harga;
        }

        if (req.body.gambar) {
            ambiltraditional.harga = req.body.gambar;
        }

        await ambiltraditional.save();
        res.send(ambiltraditional);
    } catch {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});
//delete
router.delete("/ambiltraditional/:id", async(req, res) => {
    try {
        await Traditional.deleteOne({ _id: req.params.id });
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});
//ambil satu data
router.get("/ambiltraditional/:id", async(req, res) => {
    try {
        const ambiltraditional = await Traditional.findOne({ _id: req.params.id });
        res.send(ambiltraditional);
    } catch {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});

//route untuk about
//get all post
router.get("/ambilabout", async(req, res) => {
    const ambilabout = await About.find();
    res.send(ambilabout);
});

//posting data
router.post("/ambilabout", async(req, res) => {
    const ambilabout = new About({
        judul: req.body.judul,
        isi: req.body.isi,
    });
    await ambilabout.save();
    res.send(ambilabout);
});
// update salah satu data di database
router.patch("/ambilabout/:id", async(req, res) => {
    try {
        const ambilabout = await About.findOne({ _id: req.params.id });

        if (req.body.judul) {
            ambilabout.judul = req.body.judul;
        }
        if (req.body.isi) {
            ambilabout.isi = req.body.isi;
        }

        await ambilabout.save();
        res.send(ambilabout);
    } catch {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});
//delete
router.delete("/ambilabout/:id", async(req, res) => {
    try {
        await About.deleteOne({ _id: req.params.id });
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});
//ambil satu data
router.get("/ambilabout/:id", async(req, res) => {
    try {
        const ambilabout = await About.findOne({ _id: req.params.id });
        res.send(ambilabout);
    } catch {
        res.status(404);
        res.send({ error: "Post doesn't exist!" });
    }
});

module.exports = router;