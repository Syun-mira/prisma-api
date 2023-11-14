const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const isAuthenticated = require("../middlewares/isAuthenticated");

router.get("/find", isAuthenticated, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: req.userId } });

        if (!user) {
            res.status(404).json({ error: "ユーザーが見つかりませんでした。" })
        }
        //パスワードを返したくないため指定して返す
        res.status(200).json({ user: { id: user.id, email: user.email, username: user.username } })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/profile/:userId", async (req, res) => {
    const { userId } = req.params;

    try {
        const profile = await prisma.profile.findUnique({
            where: { userId: parseInt(userId) },
            include: {
                user: {
                    include: {
                        profile: true,
                    },
                },
            },
        });

        if(!profile){
            return res.status(404).json({message: "プロフィールが見つかりませんでした"})
        };

        res.status(200).json(profile)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;