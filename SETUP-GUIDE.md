# Aevon Creation — Admin Panel Setup Guide

Aapki site ab ek **admin panel (CMS)** ke saath aati hai. Ek baar setup karne ke baad,
aap `aevoncreation.com/admin` par jaakar bina code chhue products, photos, hero
banners, categories, reviews sab manage kar paoge.

Setup ek baar ka hai — lagbhag 20-30 minute. Neeche ke steps dhyan se follow karein.

---

## PART 1 — GitHub par site daalein

1. github.com par jaayein aur ek free account banaayein (agar nahi hai).
2. Login ke baad, upar-daayein "+" → **New repository**.
3. Repository ka naam: `aevon-creation` (kuch bhi chalega). **Public** rakhein. **Create repository** dabaayein.
4. Agle page par "uploading an existing file" link par click karein.
5. Is ZIP ke **saare files aur folders** (index.html, admin/, content/, images/, build.js,
   netlify.toml, package.json, aur baaki sab) ko drag-drop karein.
   - Note: `AevonSite` folder ke *andar* ki cheezein upload karni hain, folder khud nahi.
6. Neeche **Commit changes** dabaayein. Files GitHub par aa jaayengi.

---

## PART 2 — Netlify ko GitHub se jodein

1. app.netlify.com par login karein.
2. **Add new site** → **Import an existing project** → **Deploy with GitHub**.
3. Apni `aevon-creation` repository chunein.
4. Build settings apne aap aa jaayenge (netlify.toml se):
   - Build command: `node build.js`
   - Publish directory: `.`
5. **Deploy** dabaayein. 1-2 minute me site live ho jaayegi.

(Agar aapki site pehle se drag-drop se Netlify par hai, to us purani site ko rakh sakte
hain ya delete kar sakte hain — ab ye GitHub wali site aapki asli site hogi.)

---

## PART 3 — Login system on karein (Netlify Identity)

Ye woh cheez hai jo aapko `/admin` me login karने degi.

1. Netlify me apni site kholें → **Site configuration** (ya Settings).
2. Left menu me **Identity** dhundein → **Enable Identity** dabaayein.
3. Identity page par:
   - **Registration** → **Invite only** chunें (taaki koi random signup na kar sake).
   - Neeche **Services → Git Gateway** → **Enable Git Gateway** dabaayein. (Ye CMS ko
     GitHub me changes save karne deta hai.)
4. Upar **Identity** tab me → **Invite users** → apna email daalein → invite bhejें.
5. Aapke email par invite aayega → link kholें → apna **password set karें**.

---

## PART 4 — Admin panel use karें

1. Browser me `aevoncreation.com/admin` kholें (ya abhi `your-site.netlify.app/admin`).
2. Apne email/password se login karें.
3. Ab aapko forms milenge:
   - **Products** — naya product add/edit: naam, price, category, description, photo
     upload, bestseller haan/nahi.
   - **Hero Slideshow** — home page ke top banners.
   - **Collections** — category cards (naam + photo).
   - **Site Settings** — WhatsApp number, announcement bar messages, reviews.
4. Change karke **Publish** dabaayein. 1-2 minute me site live update ho jaayegi.

---

## Zaroori baatein

- **Category match karें:** product ki category (jaise "Necklaces") wahi honi chahiye jo
  Collections me hai, tabhi filter sahi chalega.
- **Bestseller:** kisi product par "Show in Bestsellers" ON karें to woh bestseller me
  aayega (agar aage bestseller section add karें).
- **Photos:** admin se photo upload karें to woh apne aap `images/uploads/` me save hoti hai.
- Har publish par site 1-2 min me update hoti hai (Netlify rebuild karta hai).

Kuch bhi atkे to poochh lena — main guide kar dunga.
