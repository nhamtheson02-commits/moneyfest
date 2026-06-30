# MONEYFEST Brand Analysis

Nguon da doc:
- `docs/brand assets/MONEYFEST BRAND GUIDELINE.pptx`
- `docs/brand assets/MoneyFest_Brand_Manual_Visual_Identity_v5.pptx`
- `docs/brand assets/LOGO/*`
- `docs/brand assets/FONTS/*`

## Tong quan thuong hieu

MONEYFEST la he sinh thai tu van, tri thuc va ket noi giai phap tai chinh. Thuong hieu khong bat dau tu san pham can ban, ma bat dau tu hoan canh tai chinh, muc tieu, muc chiu rui ro, thoi gian va nhu cau thanh khoan cua khach hang.

Dinh vi chinh:

> Moneyfest giup ban hieu tien, hieu ban than va hieu the gioi de co nhieu lua chon hon trong cuoc song.

Core idea:

> Hieu thau luat choi - Lam chu cuoc doi.

Brand character:
- The Sage: sau sac, diem tinh, tu duy he thong, nhin thay quy luat, giai thich ban chat.
- The Advisor: thuc te, minh bach, ro rang, co trach nhiem, dua ra buoc hanh dong.

Khong duoc:
- Khoe giau.
- Tao FOMO.
- Phim hang.
- Cam ket loi nhuan.
- Day khach hang theo mot san pham duy nhat.

## Tong mau thuong hieu

He mau duoc guideline goi la `Financial Wisdom Luxury`.

Mau chinh:
- Obsidian Black: `#070707`
  - Nen chinh, chieu sau, quyen luc.
- Midnight Navy: `#071521`
  - Tai chinh, chuyen mon, uy tin.
- Heritage Gold: `#D4A83F`
  - Nhan dien, diem nhan cao cap.
- Champagne Gold: `#E8CF8B`
  - Anh sang, quote, chi tiet mem.
- Ivory: `#F4F0E8`
  - Nen doc, can bang, minh bach.
- Slate Gray: `#66717A`
  - Chu phu, du lieu thu cap.

Mau phu/xuat hien trong deck:
- White: `#FFFFFF`
- Light gray/divider: `#D7D7D7`
- Danger/red: `#B00020`
- Deep neutral: `#1A1A1A`, `#282B2B`, `#50565A`

Ti le su dung de xuat:
- 60% den/navy.
- 25% ivory.
- 10% gold.
- 5% mau chuc nang.

## Y nghia mau sac

- Den/navy tao cam giac chieu sau, ky luat, chuyen mon va cao cap.
- Vang kim la diem nhan nhan dien, khong nen dung tran lan.
- Champagne gold dung cho quote, anh sang va chi tiet mem.
- Ivory dung lam nen doc de noi dung dai de tiep can hon.
- Slate gray dung cho text phu va data thu cap.

## Typography

Font trong guideline:
- Display serif: `SVN-Georgia`
- Sans serif: `Inter`
- Body fallback duoc neu trong deck: `Inter / Source Sans 3 / Aptos`

Ung dung:
- `SVN-Georgia`: cover title, section title, quote, headline cao cap, tri ly thuong hieu.
- `Inter`: body text, bullet, bang, CTA, caption, thong tin lien he.

Website-aligned hierarchy trong guideline:
- Hero/Cover: SVN-Georgia 44-56 pt.
- Section Title: SVN-Georgia 28-36 pt.
- Slide Heading: SVN-Georgia 20-26 pt.
- Body: Inter 10-14 pt trong slide. Tren web can giu body toi thieu 16 px de dat accessibility.
- Micro Label: Inter 7-9 pt, uppercase, letter spacing rong.

Font asset co san:
- `SVN-Georgia Regular.otf`
- `SVN-Georgia Bold.otf`
- `SVN-Georgia Italic.otf`
- `SVN-Georgia Bold Italic.otf`

Ghi chu font:
- Guideline chi cung cap SVN-Georgia trong asset.
- Chua co file Inter trong brand assets.
- Chua co cong cu font chuyên dung trong runtime de doc charset OTF truc tiep. Viec ho tro tieng Viet se duoc xac minh bang render thuc te sau khi ap dung.

## Font heading

Theo guideline: `SVN-Georgia`.

## Font body

Theo guideline: `Inter`. Neu khong import Inter tu network de giu local/offline build on dinh, fallback hop ly theo guideline la `Source Sans 3` hoac `Aptos`, sau do den system sans. Hien tai brand assets khong co Inter file.

## Khoang cach

Guideline co quy dinh logo clear space:
- Dung chieu cao chu `M` trong Moneyfest lam don vi X.
- Hoac X = chieu cao ngoi sao / 1/6 chieu cao bieu tuong.
- Chua khoang cach an toan toi thieu 1X quanh logo.
- Khong dat chu, icon, QR hoac vien khung vao vung an toan.
- Kich thuoc toi thieu digital: 96 px hoac 120 px tuy bien the trong hai deck.

Guideline khong neu spacing scale cu the cho website UI. Can tao token spacing rieng dua tren he thong 4/8 px, nhung day la design-system implementation, khong phai thong tin brand goc.

## Border radius

Guideline khong neu border radius cu the cho website UI.

Ghi chu: nen dung radius tiet che de giu tinh Financial Wisdom Luxury, tranh giao dien qua "playful".

## Shadow

Guideline logo misuse ghi:
- Khong them shadow, glow hoac bevel vao logo ngoai he thong.

Guideline khong neu shadow scale cho UI card/button. Neu dung shadow, can rat nhe va khong tao cam giac flashy.

## Icon style

Motif/graphic elements trong guideline:
- North Star: dinh huong.
- Compass: dan duong.
- Map/Grid: he thong.
- Coin/Circle: tai san.
- Chess: chien luoc.
- Data Line: logic.

Nguyen tac:
- Dung motif nhu tin hieu dinh huong.
- Khong trang tri day dac.
- Moi an pham chi nen co 1 motif chinh.

Guideline khong cung cap file icon rieng trong `docs/brand assets/ICONS`.

## Image style

Moneyfest image:
- Thu vien, ban do, la ban, ban co, kien truc, du lieu toi gian.
- Chuyen gia diem tinh, anh sang dien anh, khong gian lam viec cao cap.
- Chat lieu da den, kim loai, giay co, kinh, anh vang diem nhan.

Not Moneyfest image:
- Sieu xe, biet thu, tien mat, khoe loi nhuan.
- Bieu do xanh do day dac, trading kich dong.
- Visual tao FOMO, so hai hoac cam ket lam giau.

AI prompt trong guideline:

> premium financial wisdom editorial, obsidian black and midnight navy, heritage gold compass, north star motif, cinematic library lighting, subtle financial charts, minimal, high contrast.

Thu muc `docs/brand assets/IMAGES` hien khong co file.

## Illustration style

Guideline khong dua bo illustration rieng. Cac motif nen toi gian, cao cap, co tinh he thong va dinh huong. Khong nen dung illustration gradient vui nhon/stock-like.

## Button style

Guideline khong mo ta button UI chi tiet.

CTA uu tien trong communication:
- Tai ban do.
- Tham gia cong dong.
- Dat lich sang loc.
- Tu van 60 phut.

CTA mau trong typography slide:
- "Tai Ban do phan bo tien nhan roi".

Button trong website nen:
- Dung Obsidian/Midnight lam nen chinh.
- Heritage Gold lam diem nhan/focus.
- Copy ro, hanh dong cu the.

## Card style

Guideline khong mo ta card UI chi tiet.

Nen suy ra tu visual deck:
- Card sang nen Ivory/White.
- Border mong gray/gold.
- Nhieu khoang tho.
- It shadow.
- Typography ro, premium, khong day dac.

Day la implementation note, khong phai quy chuan brand explicit.

## Form style

Guideline online communication va advisory kit co nhac toi:
- Form sang loc.
- Form dat lich.
- Checklist/proposal.

Guideline khong mo ta input visual chi tiet.

Form nen:
- Minh bach, ro rang, de doc.
- Focus state ro.
- CTA khong gay ap luc.
- Khong dung ngon ngu phan xet.

## CTA style

CTA tone:
- Dua ra buoc tiep theo ro rang.
- Khong huc day FOMO.
- Khong cam ket loi nhuan.

CTA uu tien:
- Tai ban do.
- Tham gia cong dong.
- Dat lich sang loc.
- Tu van 60 phut.

## Tone & Voice

Nen:
- Chuyen gia: giai thich bang logic, vi du, framework.
- Diem tinh: neu ca loi ich, rui ro va dieu kien.
- Khach quan: so sanh nhieu phuong an.
- Thuc te: dua checklist va buoc tiep theo.
- Ton trong: trao quyen lua chon cho khach hang.

Khong nen:
- Dung thuat ngu de gay choang.
- Ho hao, giat gan, cam ket loi nhuan.
- Dan dat mot chieu theo san pham.
- Ly thuyet dai nhung thieu hanh dong.
- Gay ap luc hoac phan xet.

## Logo

Y nghia:
- Monogram M: Moneyfest / Money Map, canh cong vao the gioi tai chinh thong minh.
- Guiding Star: diem dan duong.
- Circle of Trust: he sinh thai, niem tin, bao ve khach hang.
- Gold on Black: gia tri, ky luat, chieu sau.

Quy chuan:
- Uu tien logo co slogan cho lan xuat hien chinh.
- Logo khong slogan cho khong gian nho.
- Emblem cho avatar/icon.
- Luon giu khoang tho theo X.
- Nen dung vang tren den/navy cho nhan dien cao cap.
- Khong keo gian.
- Khong doi mau ngoai palette.
- Khong them hieu ung.
- Khong dat tren nen roi/thieu tuong phan.
- Khong tach thanh phan neu chua co quy chuan.
- Khong dung tagline khi kich thuoc khong du doc.

Asset logo ngoai:
- `Moneyfest_Logo_2K_2048x2048-remove-bg-io.png`: 2048x2048 RGBA.
- `ChatGPT Image 17_51_09 29 thg 6, 2026.png`: 1254x1254 RGB.
- `ChatGPT_Image_17_51_09_29_thg_6__2026-removebg-preview.png`: 500x500 RGBA.
- `ChatGPT Image 17_51_16 29 thg 6, 2026.png`: 1774x887 RGB.
- `ChatGPT_Image_17_51_16_29_thg_6__2026-removebg-preview.png`: 707x353 RGBA.
- `ChatGPT Image 17_57_09 29 thg 6, 2026.png`: 1774x887 RGB.
- `ChatGPT_Image_17_57_09_29_thg_6__2026-removebg-preview.png`: 707x353 RGBA.

## Diem chua ro / thieu tai lieu

- Khong co file Inter trong brand assets.
- Khong co icon set trong `ICONS`.
- Khong co image library trong `IMAGES`.
- Khong co favicon/OG image rieng ngoai logo PNG.
- Khong co quy chuan radius, shadow, spacing scale, component state, table, modal, chart chi tiet cho website.
- Khong co quy chuan animation.
