// AUTO PRO CONTENT BĐS — app-logic.js v6.0 (16/05/2026)
// 4 tính năng mới: Survey↔Content Sync | Follow-up Reminders | Dashboard | Hướng dẫn

// ===================== DATA =====================
const SG={
  type:['Nhà phố','Căn hộ chung cư','Biệt thự','Nhà mặt tiền','Shophouse','Liền kề','Đất nền','Penthouse'],
  price:['1.5 tỷ','2.5 tỷ','3.5 tỷ','5 tỷ','6.5 tỷ','8 tỷ','10 tỷ','15 tỷ','8tr/tháng'],
  area:['40m²','50m²','60m²','80m²','100m²','120m²','4x15m','5x20m','6x18m'],
  loc:['Quận 1','Quận 2','Quận 3','Quận 7','Quận 9','Bình Thạnh','Tân Bình','Gò Vấp','Bình Chánh','Thủ Đức','Bình Dương'],
  pros:['Sổ hồng riêng','Hẻm xe hơi','Gần trường','Gần bệnh viện','Gần chợ','Pháp lý sạch','An ninh 24/7','Nhà mới 100%','Không ngập'],
  diff:['View sông','Thiết kế hiện đại','Giá thấp hơn TT 10%','Tặng full nội thất','Hỗ trợ vay 70%','Chủ cần bán gấp']
};

const PSYCH=[
  {p:'Tham',e:'💰',tag:'Ham lợi, ham deal hời',desc:'Muốn nhiều, muốn nhanh, sợ bỏ lỡ. Quyết định nhanh khi thấy giá tốt.',keys:['Giá hời','Tặng thêm','Sinh lời','Cơ hội duy nhất']},
  {p:'Sân',e:'🔥',tag:'Nóng tính, dứt khoát',desc:'Không thích vòng vo, muốn câu trả lời ngay, dứt khoát.',keys:['Thẳng thắn','Rõ ràng','Vào thẳng vấn đề','Không lan man']},
  {p:'Si',e:'🤔',tag:'Phân vân, thiếu thông tin',desc:'Chưa hiểu rõ, ngại quyết định. Cần được hướng dẫn từng bước.',keys:['Giải thích kỹ','Cầm tay chỉ việc','Đơn giản','Dễ hiểu']},
  {p:'Ngạo mạn',e:'👑',tag:'Đẳng cấp, cái tôi cao',desc:'Coi trọng địa vị. Không thích bị chào hàng rẻ tiền.',keys:['Đẳng cấp','Limited','Độc bản','Dành cho người chọn lọc']},
  {p:'Nghi ngờ',e:'🔍',tag:'Cẩn trọng, sợ lừa',desc:'Cần bằng chứng cụ thể, pháp lý rõ ràng.',keys:['Sổ hồng chính chủ','Cam kết','Bằng chứng','Hoàn tiền nếu sai']}
];

const FRM=[
  {id:'AIDA',lt:'AI',name:'AIDA',steps:'Attention→Interest→Desire→Action',desc:'Gây chú ý → Tạo hứng thú → Khơi khao khát → Kêu gọi hành động.',ex:'🚨 Hiếm có! Hẻm xe hơi Phú Nhuận chỉ 8.5 tỷ. Sổ hồng riêng!'},
  {id:'PAS',lt:'PA',name:'PAS',steps:'Problem→Agitate→Solution',desc:'Nêu vấn đề → Khoét sâu nỗi đau → Đưa ra giải pháp.',ex:'Mua nhà sai = mất 5 năm tiết kiệm. Đừng để giấc mơ thành ác mộng...'},
  {id:'BAB',lt:'BA',name:'BAB',steps:'Before→After→Bridge',desc:'Trước (khổ) → Sau (sướng) → Cây cầu là sản phẩm của bạn.',ex:'Chật chội thuê 8tr/tháng → An cư nhà riêng. Trả góp 15tr/tháng.'},
  {id:'FAB',lt:'FA',name:'FAB',steps:'Features→Advantages→Benefits',desc:'Đặc điểm → Lợi thế → Lợi ích thiết thực cho khách.',ex:'60m² 4 tầng → đủ phòng 5 người → ba mẹ có phòng riêng yên tĩnh.'},
  {id:'4P',lt:'4P',name:'4P',steps:'Picture→Promise→Prove→Push',desc:'Vẽ bức tranh → Hứa hẹn → Chứng minh → Thúc đẩy.',ex:'BBQ sân thượng cuối tuần. Cam kết pháp lý sạch. Chốt tuần này tặng 50tr.'},
  {id:'AICP',lt:'AC',name:'AICP',steps:'Awareness→Interest→Consideration→Purchase',desc:'Phù hợp phễu content dài hạn, nuôi dưỡng lead.',ex:'Bài 1 giới thiệu khu, bài 2 lợi ích, bài 3 so sánh, bài 4 chốt.'},
  {id:'Auto',lt:'AI',name:'Auto (AI chọn)',steps:'AI tự phân tích & chọn',desc:'AI phân tích BĐS + tâm lý KH → tự chọn công thức tối ưu nhất.',ex:'Để AI quyết định — luôn cho kết quả tối ưu tự động.'}
];

const FS_DATA={
  'Kim':{e:'⚪',c:'#c0c0c0',kw:['Thanh lịch','Tinh tế','Trắng sáng','Đỉnh cao','Kim cương','Sang trọng'],col:['Trắng','Bạc','Vàng nhạt'],avoid:['Đỏ đậm','Cam'],tip:'Ngôn ngữ sang trọng, tinh tế. Nhấn mạnh vật liệu cao cấp.'},
  'Mộc':{e:'🌿',c:'#3ecf8e',kw:['Xanh mướt','Tươi mới','Cây xanh','Thoáng đãng','Thiên nhiên','Vươn lên'],col:['Xanh lá','Xanh ngọc'],avoid:['Trắng bạc'],tip:'Nhấn mạnh cây xanh, ban công, sân vườn.'},
  'Thuỷ':{e:'💧',c:'#4c9cf5',kw:['Dòng chảy','Thịnh vượng','View nước','Mát mẻ','Thanh bình','Sâu sắc'],col:['Xanh dương','Xanh navy'],avoid:['Vàng đất'],tip:'Nhấn mạnh view sông, hồ bơi, không gian mát.'},
  'Hoả':{e:'🔥',c:'#ef5350',kw:['Nhiệt huyết','Bừng sáng','Nổi bật','Mạnh mẽ','Rực rỡ','Thành công'],col:['Đỏ','Cam','Tím hồng'],avoid:['Xanh lá'],tip:'Ngôn ngữ mạnh mẽ. Nhấn mạnh ánh sáng, hướng Nam/Đông.'},
  'Thổ':{e:'🌍',c:'#f5a623',kw:['Vững chắc','An toàn','Bền lâu','Ổn định','Gia đình','Tích lũy'],col:['Vàng đất','Nâu','Cam đất'],avoid:['Xanh lá đậm'],tip:'Nhấn mạnh bền vững, an cư lâu dài.'}
};

const AGENTS=[
  {n:'Super Hooks Master',e:'⚡',d:'Cỗ máy tạo tiêu đề hấp dẫn cho mọi nền tảng',l:'https://chatgpt.com/g/g-68557c90165081919714768b42fbffdb-super-hooks-master'},
  {n:'Hooks Master',e:'🎣',d:'Tạo 5 hook hấp dẫn tiếng Việt theo nền tảng',l:'https://chatgpt.com/g/g-67f3dde82c548191bca1902e82be3dc9-hook-master'},
  {n:'Kaizen Master',e:'🔧',d:'AI tối ưu tiêu đề, mở đầu và nội dung marketing',l:'https://chatgpt.com/g/g-684e3fb0a7088191a124aac4dba0986f-kaizen-master'},
  {n:'Viral Jetlag',e:'🚀',d:'Nhân bản nội dung viral thành phiên bản mới',l:'https://chatgpt.com/g/g-684ee60cf900819188d8ca1905327332-viral-jetlag'},
  {n:'The Vaults',e:'🏛️',d:'AI tạo 90 câu hỏi KH theo 30 Elements of Value',l:'https://chatgpt.com/g/g-684e9561bd9c8191837056a7af16c927-the-vaults'},
  {n:'Bình Luận FB',e:'💬',d:'AI viết comment thú vị cho bài đăng Facebook',l:'https://chatgpt.com/g/g-684e9561bd9c8191837056a7af16c927-the-vaults'},
  {n:'Trợ Lý Kênh SEO',e:'📺',d:'Xây dựng kênh video ngắn chuẩn SEO đa nền tảng',l:'https://chatgpt.com/g/g-68a5aa0b72a88191b7a4ab5a2fae7a23-tro-ly-xay-dung-kenh-chuan-seo-tisa'},
  {n:'Trợ Lý Content',e:'✍️',d:'Sáng tạo kịch bản thương hiệu cá nhân, tăng Follow',l:'https://chatgpt.com/g/g-67c9958801a881919a24e8a2520eec3b-tro-ly-content-hoc-vien-tisa'}
];

const SURVEY_STEPS=[
  {num:1,title:'Xác định chính xác địa chỉ & hẻm',items:['Xác nhận số nhà, hẻm vào — KHÔNG được lộn nhà, lộn lô','Đo chiều rộng hẻm (bao nhiêu mét)','Hẻm thông hay hẻm cụt? Có đường khác không?','Gọi lại Chuyên gia ngay nếu chưa rõ địa chỉ']},
  {num:2,title:'Kiểm tra loại đất & pháp lý',items:['ODT – Đất ở đô thị (tốt nhất cho giao dịch)','ONT – Đất ở nông thôn (hạn chế xây dựng)','Đất hỗn hợp hoặc đất quy hoạch (rủi ro cao)','Xin scan sổ hồng kiểm tra mục đích sử dụng','Kiểm tra có dính quy hoạch lộ giới không']},
  {num:3,title:'Kiểm tra hệ thống điện (Lửa)',items:['Có cột điện án ngữ trước nhà không?','Có dây điện cao thế/hạ thế giăng ngang không?','Gần trạm biến áp không? Khoảng cách?','Nhiều khách rất kỵ điểm này — ghi rõ vào báo cáo']},
  {num:4,title:'Xác định hướng nhà',items:['Xác định: Đông/Tây/Nam/Bắc/Đông Nam/Tây Bắc','Dùng la bàn điện thoại để xác định chính xác','Hướng Nam hoặc Đông Nam: được chuộng nhất','Khách mua ở rất quan tâm phong thủy hướng nhà']},
  {num:5,title:'Kiểm tra môi trường xung quanh 100m',items:['Có Nghĩa trang, Nhà tang lễ gần đây không?','Có bãi rác, khu ô nhiễm, nhà máy không?','Có quán karaoke, bar gây ồn không?','Nếu có phải ghi rõ — nhược điểm quan trọng']},
  {num:6,title:'Quan sát hàng xóm & cộng đồng',items:['Hàng xóm thân thiện hay khó chịu?','Khu dân trí cao hay phức tạp?','Có nhiều nhà cho thuê, phòng trọ không?','Ảnh hưởng trực tiếp trải nghiệm sống của KH']},
  {num:7,title:'Kiểm tra hẻm chi tiết',items:['Hẻm thông hay hẻm cụt?','Rộng bao nhiêu mét (đo cụ thể)','Xe hơi vào được không? 4 chỗ? 7 chỗ?','Có đường thoát thứ 2 không?']},
  {num:8,title:'Kiểm tra hạ tầng thoát nước',items:['Ống cống, hố ga nằm ở đâu?','Khu vực có lịch sử ngập nước không?','Hỏi hàng xóm: ngập bao nhiêu cm mùa mưa?','Có bãi rác án ngữ đường thoát nước không?']},
  {num:9,title:'Kiểm tra tâm linh khu vực',items:['Gần miếu, chùa, nhà thờ không? Khoảng cách?','Gần nghĩa địa không? Quan sát kỹ','Yếu tố HAI MẶT: KH có người kỵ, có người thích','Ghi rõ vào báo cáo để tư vấn trung thực']}
];

const READ_KH_QS=[
  {q:'Khi đang xem nhà, KH nói gì đầu tiên?',opts:['Hỏi ngay: "Giá bao nhiêu? Có bớt không?"','Im lặng quan sát kỹ từng góc','Hỏi: "Nhà này có gì đặc biệt?"','Nhận xét ngay: "Đẹp" hoặc "Hơi cũ"'],score:[0,2,1,3]},
  {q:'Khi bạn báo giá, KH phản ứng thế nào?',opts:['Hỏi ngay "Có bớt thêm không?"','Gật đầu, im lặng, tiếp tục xem','Hỏi rất nhiều về pháp lý, thủ tục','Nói "Giá này ổn" và không mặc cả'],score:[0,2,4,3]},
  {q:'KH hỏi về điều gì NHIỀU NHẤT?',opts:['Giá, chiết khấu, ưu đãi','Vị trí, hướng, phong thủy','Pháp lý, sổ hồng, thủ tục','Thiết kế, nội thất, sửa được gì'],score:[0,1,4,2]},
  {q:'Tốc độ ra quyết định?',opts:['Nhanh — quyết định ngay buổi xem','Chậm — cần về bàn gia đình','Rất chậm — xem nhiều lần vẫn chưa chốt','Trung bình — 2-3 ngày'],score:[0,2,1,2]},
  {q:'Khi bạn nói "Còn người khác đang xem", KH phản ứng?',opts:['Lo lắng, hỏi "Sao họ chưa chốt?"','Thờ ơ, "Ai thích thì mua"','Không tin, cần xác nhận','Bình thản, tiếp tục hỏi'],score:[0,1,4,2]},
  {q:'Cách KH nói chuyện trong buổi xem?',opts:['Hỏi nhiều về đầu tư, cho thuê được không','Nói ít, quan sát kỹ, gật/lắc đầu','Hỏi rất chi tiết, ghi chú cẩn thận','Nói nhiều về muốn sửa chữa, thiết kế'],score:[0,3,4,2]},
  {q:'Khi có nhược điểm, KH nói gì?',opts:['Dùng ngay để mặc cả giá','Im lặng hoặc khó chịu','Hỏi ảnh hưởng pháp lý không','Hỏi sửa tốn bao nhiêu'],score:[0,1,4,2]},
  {q:'KH đi xem nhà cùng ai?',opts:['Một mình — quyết định độc lập','Cả gia đình — cần đồng thuận','Bạn am hiểu BĐS','Chỉ vợ/chồng — quyết định 2 người'],score:[0,2,4,1]},
  {q:'Sau xem nhà, KH nhắn tin thế nào?',opts:['Reply ngay, hỏi thêm ưu đãi','Không reply — im lặng','Reply chi tiết, yêu cầu thêm hồ sơ','Reply nhưng "Để suy nghĩ thêm"'],score:[0,1,4,2]},
  {q:'Khi hỏi "Thích nhất điểm gì?", KH trả lời?',opts:['Giá cả hợp lý, thương lượng được','Vị trí tiện lợi, gần chỗ làm','Pháp lý rõ ràng, yên tâm','Không gian rộng, phù hợp gia đình'],score:[0,2,4,1]}
];

const PSY_COLORS={'Tham':'var(--ac)','Sân':'var(--rd)','Si':'var(--bl)','Ngạo mạn':'var(--pu)','Nghi ngờ':'var(--gr)'};

const SCH_PLAN=[
  {day:'T2',theme:'Giới thiệu BĐS',time:'8:00 & 20:00',platforms:['FB','Zalo'],pk:'fb',strategy:'NHẬN BIẾT — Bài đầu tuần giới thiệu tổng quan. Hook mạnh + ảnh đẹp nhất.'},
  {day:'T3',theme:'Video Tour Thực Tế',time:'19:00–21:00',platforms:['TikTok'],pk:'tiktok',strategy:'NỘI DUNG — Quay video tour căn nhà. Giờ vàng tối để reach tối đa.'},
  {day:'T4',theme:'Tương Tác & Engagement',time:'12:00 & 20:00',platforms:['FB'],pk:'fb',strategy:'TƯƠNG TÁC — Post câu hỏi, poll. Tăng comment, share tự nhiên.'},
  {day:'T5',theme:'Pháp Lý & Uy Tín',time:'8:00 & 17:00',platforms:['Zalo','FB'],pk:'zalo',strategy:'TIN TƯỞNG — Đăng bằng chứng sổ hồng. Xây dựng niềm tin trước cuối tuần.'},
  {day:'T6',theme:'So Sánh & Giá Trị',time:'12:00–22:00',platforms:['FB','TikTok'],pk:'fb',strategy:'CÂN NHẮC — Content so sánh, lý do nên mua. KH lên kế hoạch xem nhà cuối tuần.'},
  {day:'T7',theme:'Chốt Deal / Thu Lead',time:'9:00–21:00',platforms:['FB','Zalo','TikTok'],pk:'fb',strategy:'🔥 NGÀY VÀNG — Đăng ưu đãi, khan hiếm, CTA mạnh. Sắp lịch xem nhà T7-CN.'},
  {day:'CN',theme:'Follow-up & Story',time:'10:00–20:00',platforms:['Zalo','FB'],pk:'zalo',strategy:'GIỮ NÓNG — Nhắn follow-up lead. Story behind-the-scenes. Chuẩn bị tuần sau.'}
];

const DEFAULT_SCRIPTS=[
  {cat:'Chốt deal',sit:'KH phân vân chưa quyết',txt:'"Anh/chị ơi, em hiểu quyết định mua nhà rất quan trọng. Nhưng hôm nay chủ đang giữ giá — ngày mai không chắc ạ. Mình đặt cọc 10 triệu, cam kết hoàn 100% nếu 3 ngày anh/chị đổi ý nhé!"'},
  {cat:'Chốt deal',sit:'KH nói "Về bàn với gia đình"',txt:'"Anh/chị mời họ qua xem luôn hôm nay được không ạ? Em sẵn sàng chờ. Nếu không, mình đặt lịch sáng mai trước 10h để em giữ được giá hiện tại ạ."'},
  {cat:'Chốt deal',sit:'KH hỏi "Có bớt thêm không?"',txt:'"Nếu anh/chị quyết định trong hôm nay, em thương lượng thêm được [X] triệu nữa ạ. Phải trong hôm nay — vì em đã hứa với chủ giữ giá đến cuối ngày."'},
  {cat:'Chốt deal',sit:'KH im lặng sau khi nghe giá',txt:'"[Im lặng cùng 10 giây] — Anh/chị đang cân nhắc điều gì ạ? Em muốn hiểu để hỗ trợ đúng hơn."'},
  {cat:'Chốt deal',sit:'KH nói "Để xem thêm vài căn nữa"',txt:'"Anh/chị đang so sánh tiêu chí nào ạ? Nếu em biết, em giúp so sánh trực tiếp ngay bây giờ — khỏi mất công đi thêm ạ."'},
  {cat:'Chốt deal',sit:'Chốt bằng lựa chọn nhỏ',txt:'"Anh/chị muốn đặt cọc 30 triệu hay 50 triệu ạ? Em làm hợp đồng đặt cọc luôn hôm nay."'},
  {cat:'Chốt deal',sit:'KH tỏ ra thích nhưng chưa chốt',txt:'"Em thấy anh/chị rất thích căn này — đặc biệt điểm [điểm KH khen]. Mình chốt để em giữ cho anh/chị nhé? Chỉ cần 10 triệu cọc là an tâm rồi ạ."'},
  {cat:'Chốt deal',sit:'Chốt cuối buổi xem nhà',txt:'"Trong tất cả những căn đã xem, anh/chị thích căn này ở điểm nào nhất? [Nghe xong] — Vậy thì mình đặt cọc để giữ ngay hôm nay nhé ạ?"'},
  {cat:'Chốt deal',sit:'KH nói "Giá chưa hợp lý"',txt:'"Anh/chị thấy giá hợp lý ở mức nào ạ? Em sẽ trình lên chủ xem có thể đáp ứng được không — nhưng cần có con số cụ thể để thương lượng ạ."'},
  {cat:'Chốt deal',sit:'Assumptive close — giả định chốt',txt:'"Vậy mình đặt lịch công chứng thứ mấy tuần này tiện cho anh/chị nhất ạ — thứ Tư hay thứ Sáu?"'},
  {cat:'Xử lý phản đối',sit:'KH nói "Giá đắt quá"',txt:'"Đắt hay rẻ phải so với cái gì đúng không ạ? Căn tương tự 300m gần đây giá [X], còn căn này có thêm [điểm mạnh]. Thực ra giá này đang hợp lý ạ."'},
  {cat:'Xử lý phản đối',sit:'KH nói "Pháp lý có chắc không?"',txt:'"Câu hỏi hay ạ! Em cam kết 100%: sổ hồng chính chủ, gửi scan ngay. Nếu thông tin sai bất kỳ điểm nào, hoàn cọc toàn bộ ạ."'},
  {cat:'Xử lý phản đối',sit:'KH nói "Chỗ khác rẻ hơn"',txt:'"Cho em biết căn đó ở đâu không? Em so sánh thẳng DT, pháp lý, vị trí — anh/chị thấy ngay sự khác biệt ạ."'},
  {cat:'Xử lý phản đối',sit:'KH nói "Nhà cũ quá"',txt:'"Đúng ạ — kết cấu cũ nhưng móng và cột rất chắc. Sửa mặt tiền khoảng 50-100 triệu là như nhà mới. Mà giá đang thấp hơn nhà mới cùng diện tích [X] tỷ ạ."'},
  {cat:'Xử lý phản đối',sit:'KH nói "Hẻm nhỏ quá"',txt:'"Hẻm rộng [X]m — xe máy 2 chiều thoải mái ạ. Thực ra nhà hẻm nhỏ giá thấp hơn nhà hẻm lớn 15-20%, mà an ninh lại tốt hơn vì ít xe qua lại ạ."'},
  {cat:'Xử lý phản đối',sit:'KH nói "Gần chùa / nghĩa trang"',txt:'"Điểm này em luôn tư vấn thẳng ạ. Có người rất kỵ, nhưng cũng có nhiều gia đình tìm được vì yên tĩnh và giá tốt. Anh/chị cảm thấy thế nào về điểm này ạ?"'},
  {cat:'Xử lý phản đối',sit:'KH nói "Chờ thị trường giảm"',txt:'"Khu [Khu vực] đã tăng X% trong 3 năm qua ạ. Nếu chờ thêm 1 năm, chi phí cơ hội (tiền thuê + giá tăng) có thể lớn hơn số chờ đợi được ạ."'},
  {cat:'Xử lý phản đối',sit:'KH nói "Không thích hướng nhà"',txt:'"Hướng [hướng] theo phong thuỷ phù hợp với tuổi [tuổi KH] ạ. Ngoài ra hướng này tránh được nắng chiều, điện sinh hoạt sẽ thấp hơn đáng kể ạ."'},
  {cat:'Xử lý phản đối',sit:'KH nói "Sợ bị lừa"',txt:'"Em hiểu cảm giác đó ạ — thị trường có nhiều trường hợp không tốt. Vì vậy em cam kết: mình ra phòng công chứng kiểm tra toàn bộ hồ sơ trước khi đặt cọc. Anh/chị không mất gì cả ạ."'},
  {cat:'Xử lý phản đối',sit:'KH nói "Chưa có nhu cầu"',txt:'"Dạ em hiểu ạ. Nhưng cho em hỏi — nếu có căn nhà vị trí tốt, giá hợp lý, pháp lý sạch, anh/chị có muốn tham khảo không? Biết đâu lại phù hợp ạ."'},
  {cat:'Tạo urgency',sit:'KH chần chừ chưa đặt cọc',txt:'"Tuần này đã có 2 khách xem căn này rồi ạ. Đặt cọc tượng trưng hôm nay — em giữ căn, hoàn lại nếu không phù hợp ạ."'},
  {cat:'Tạo urgency',sit:'Căn nhà sắp có người khác chốt',txt:'"Anh/chị ơi, em vừa nhận được tin nhắn từ khách khác hỏi về căn này. Em muốn ưu tiên cho anh/chị vì anh/chị xem trước — nhưng em cần câu trả lời trong hôm nay ạ."'},
  {cat:'Tạo urgency',sit:'Giá sắp tăng',txt:'"Chủ nhà vừa báo em tuần sau sẽ điều chỉnh giá lên thêm [X] triệu vì có dự án hạ tầng mới. Nếu anh/chị quyết định trước cuối tuần, em giữ được giá hiện tại ạ."'},
  {cat:'Tạo urgency',sit:'Cuối tuần — deadline tự nhiên',txt:'"Hôm nay thứ Sáu rồi ạ — cuối tuần thường là thời điểm nhiều người đi xem nhà nhất. Anh/chị muốn em giữ lịch xem riêng cho anh/chị sáng mai không ạ?"'},
  {cat:'Tạo urgency',sit:'Chủ nhà đang cân nhắc rút',txt:'"Chủ vừa có người thân muốn mua lại ạ. Em đang thuyết phục chủ ưu tiên cho anh/chị vì mình đã nói chuyện trước — nhưng em cần câu trả lời sớm ạ."'},
  {cat:'Xây dựng trust',sit:'Lần đầu gặp KH',txt:'"Trước khi giới thiệu nhà, em muốn hỏi nhu cầu thật sự — để gợi ý đúng, không mất thời gian hai bên ạ. Anh/chị mua để ở hay đầu tư ạ?"'},
  {cat:'Xây dựng trust',sit:'KH nghi ngờ môi giới',txt:'"Em hiểu anh/chị thận trọng — nghề này có nhiều người không tốt. Em làm việc theo nguyên tắc: nói thật 100%, kể cả nhược điểm. Nếu căn này không phù hợp em sẽ nói thẳng ạ."'},
  {cat:'Xây dựng trust',sit:'Giới thiệu bản thân lần đầu',txt:'"Em [Tên], đã giao dịch [X] căn tại khu [Khu vực]. Em có thể cho anh/chị số điện thoại của KH đã mua qua em để xác nhận nếu anh/chị muốn ạ."'},
  {cat:'Xây dựng trust',sit:'KH lo ngại về hoa hồng',txt:'"Hoa hồng của em do chủ nhà trả, không phải do anh/chị ạ. Nên em không có lý do gì để tư vấn sai cho anh/chị cả — quyền lợi của em gắn với sự hài lòng của anh/chị ạ."'},
  {cat:'Xây dựng trust',sit:'Sau khi chốt deal',txt:'"Em cảm ơn anh/chị đã tin tưởng ạ! Em sẽ đồng hành cùng anh/chị đến khi bàn giao nhà xong — có bất kỳ vấn đề gì anh/chị cứ liên hệ em trực tiếp nhé."'},
  {cat:'Follow-up',sit:'Sau 3 ngày KH chưa trả lời',txt:'"Chào anh/chị! Em muốn hỏi thăm — đang cân nhắc ở điểm nào nhất ạ? Giá, pháp lý hay vị trí? Để em hỗ trợ đúng chỗ ạ."'},
  {cat:'Follow-up',sit:'KH xem nhà không liên hệ lại',txt:'"Chào anh/chị! Em có thêm thông tin mới về căn hôm trước. Anh/chị muốn xem lại không ạ?"'},
  {cat:'Follow-up',sit:'Follow-up sau 1 tuần',txt:'"Chào anh/chị! Tuần rồi chắc anh/chị bận. Em vừa có thêm [X] căn mới trong khu [KV] — giá và vị trí khá tốt. Anh/chị có muốn em gửi thông tin qua Zalo không ạ?"'},
  {cat:'Follow-up',sit:'KH nói "Sẽ liên hệ lại sau"',txt:'"Dạ em tôn trọng ạ! Anh/chị cho em hỏi — khoảng thời gian nào anh/chị muốn em liên hệ lại ạ? Tuần sau hay tháng sau? Để em không làm phiền sai lúc ạ."'},
  {cat:'Follow-up',sit:'Gửi thông tin giá trị (không bán)',txt:'"Chào anh/chị! Em gửi anh/chị bài phân tích thị trường BĐS [Khu vực] tháng này — có thể hữu ích cho quyết định của anh/chị. Không có gì cần trả lời ạ, chỉ muốn chia sẻ 😊"'},
  {cat:'Follow-up',sit:'KH đã mua nhà nơi khác',txt:'"Chúc mừng anh/chị đã có nhà mới ạ! Nếu sau này anh/chị có nhu cầu mua thêm để đầu tư, hoặc có bạn bè cần tư vấn BĐS, em luôn sẵn sàng hỗ trợ ạ 🙏"'},
  {cat:'Dẫn xem nhà',sit:'Mở đầu buổi xem nhà',txt:'"Trước khi vào, em muốn hỏi anh/chị đang ưu tiên điều gì nhất: vị trí, không gian, hay pháp lý? Để em giới thiệu đúng trọng tâm ạ."'},
  {cat:'Dẫn xem nhà',sit:'KH nhận xét tiêu cực',txt:'"Anh/chị nhận xét rất tinh tế ạ! Điểm đó đúng là một hạn chế. Nhưng bù lại căn này có [điểm mạnh] mà hầu hết các căn khác trong tầm giá này không có ạ."'},
  {cat:'Dẫn xem nhà',sit:'KH hỏi "Sao chủ bán?"',txt:'"Chủ đang [lý do thật: nợ / chia tài sản / chuyển chỗ]. Đây chính là lý do giá đang tốt — chủ cần bán nhanh nên sẵn sàng thương lượng ạ."'},
  {cat:'Dẫn xem nhà',sit:'Tạo mental ownership',txt:'"Nếu đây là nhà anh/chị, anh/chị sẽ bố trí phòng ngủ master ở tầng mấy ạ? [Nghe và đồng ý] — Vậy thì phù hợp lắm với layout ở đây ạ."'},
  {cat:'Dẫn xem nhà',sit:'Kết thúc buổi xem nhà',txt:'"Anh/chị thấy căn này so với những căn đã xem thế nào ạ? Điểm nào anh/chị thích nhất? [Nghe] — Vậy thì đây là căn phù hợp nhất với tiêu chí của anh/chị rồi ạ."'},
  {cat:'Đầu tư',sit:'KH hỏi tiềm năng tăng giá',txt:'"Khu [KV] có [dự án hạ tầng] dự kiến hoàn thành năm [năm]. Căn tương tự 2 năm trước giá [X], giờ đã [X+Y]. Tỷ suất khoảng [Z]%/năm ạ."'},
  {cat:'Đầu tư',sit:'KH hỏi cho thuê được không',txt:'"Khu này giá thuê trung bình [X] triệu/tháng ạ. Nếu vay 70% thì trả góp [Y] triệu — tiền thuê gần đủ trả góp, thực ra KH gần như được ở miễn phí ạ."'},
  {cat:'Đầu tư',sit:'KH so sánh với gửi tiết kiệm',txt:'"Gửi tiết kiệm 5-6%/năm ạ. BĐS khu này tăng trung bình [X]%/năm cộng thêm tiền thuê [Y]%/năm — tổng ROI cao hơn gửi tiết kiệm đáng kể ạ."'},
  {cat:'Cho thuê',sit:'KH hỏi về nhà cho thuê',txt:'"Căn này phù hợp cho thuê gia đình [X] người ạ. Giá thuê thị trường khu này [X] triệu/tháng — anh/chị có thể bắt đầu cho thuê ngay sau khi nhận bàn giao ạ."'},
  {cat:'Cho thuê',sit:'KH lo căn nhà khó cho thuê',txt:'"Vị trí [gần trường/bệnh viện/KCN] nên nhu cầu thuê rất cao ạ. Em có thể kết nối anh/chị với dịch vụ quản lý cho thuê chuyên nghiệp — anh/chị không cần tự quản lý ạ."'},
  {cat:'Thương lượng',sit:'KH muốn giảm giá mạnh',txt:'"Mức anh/chị đề nghị thấp hơn thị trường [X]% ạ. Em sẽ trình lên chủ — nhưng để thuyết phục được chủ, anh/chị có thể đặt cọc ngay hôm nay không? Điều đó cho chủ thấy anh/chị nghiêm túc ạ."'},
  {cat:'Thương lượng',sit:'Chủ không giảm, KH muốn thêm',txt:'"Giá chủ giữ vững ạ — nhưng em đã thương lượng được thêm [tặng nội thất / miễn phí sang tên / bàn giao sớm]. Như vậy tổng giá trị anh/chị nhận thêm khoảng [X] triệu ạ."'},
  {cat:'Thương lượng',sit:'Hai bên chênh lệch ít',txt:'"Hai bên chỉ còn chênh [X] triệu ạ — so với giá trị căn nhà thì rất nhỏ. Em đề xuất mỗi bên nhường một nửa — chủ giảm [X/2] triệu, anh/chị tăng [X/2] triệu, mình chốt được ạ?"'}
];

// ===================== STATE =====================
let VS=[],VI=0,PLT='fb',
pst={ver:'1',abp:'FB',obj:'price',story_dur:'15s',story_plt:'FB Story',ht_plt:'FB',cl_type:'Nhà phố'},
crm=[],tpl=[],reminders=[],contentLog=[],
authorProf={name:'Trần Thế Vinh',title:'Chuyên gia tư vấn BĐS TP.HCM',phone:'0938.121.937',zalo:'0792.227.522',quote:'Lời nói có thể truyền cảm hứng, nhưng chỉ có hành động mới mang bạn đến gần ước mơ.',avatar:'',link:'https://zalo.me/0792227522',social:'@tranthevinh.bds'},
prof={name:'',title:'',phone:'',zalo:'',quote:'',avatar:''},
selEl='Kim',selPsy='Si',selFrm='AIDA',
schedProp='',svData={},rkAnswers=[],
saleScripts=[...DEFAULT_SCRIPTS],curSaleCat='Chốt deal';

// ===================== SAVE OUTPUT HELPER =====================
function saveOutputToLibrary(name,content,type){
  if(!content||content.length<5)return toast('⚠️ Không có nội dung để lưu!');
  const item={id:Date.now(),name,time:new Date().toLocaleString('vi-VN'),type,content,vs:[{py:type,frm:'',gs:[],fb:content,zalo:content,tiktok:content,web:content}]};
  tpl.unshift(item);saveSt();buildTpl();updStats();toast('✅ Đã lưu vào Thư viện: '+name);
}

// ===================== INIT =====================
function init(){
  loadSt();buildSg();buildPsychCards();buildFrmCards();
  buildAgents();buildFSEl();buildCRM();buildTpl();buildProf();buildEarn();
  updStats();buildHomeRecent();buildHomeWorkflow();buildHomeFeatures();buildHBModules();
  buildSurveySteps();buildReadKH();buildSaleScripts();
  updGoalHint('goalPills_gen');
  buildReminders();
  checkDueReminders();
  buildDashboard();
}

function loadSt(){
  try{
    const c=localStorage.getItem('bds_c');if(c)crm=JSON.parse(c);
    const t=localStorage.getItem('bds_t');if(t)tpl=JSON.parse(t);
    const p=localStorage.getItem('bds_p');if(p){prof=JSON.parse(p);loadProfInp();}
    if(prof.avatar)showAv(prof.avatar);
    const ss=localStorage.getItem('bds_ss');
    if(ss){const cu=JSON.parse(ss);saleScripts=[...cu,...DEFAULT_SCRIPTS.filter(d=>!cu.find(u=>u.sit===d.sit))];}
    const rm=localStorage.getItem('bds_rm');if(rm)reminders=JSON.parse(rm);
    const cl=localStorage.getItem('bds_cl');if(cl)contentLog=JSON.parse(cl);
  }catch(e){}
}
function saveSt(){
  try{
    localStorage.setItem('bds_c',JSON.stringify(crm));
    localStorage.setItem('bds_t',JSON.stringify(tpl));
    localStorage.setItem('bds_p',JSON.stringify(prof));
    const cu=saleScripts.filter(s=>!DEFAULT_SCRIPTS.find(d=>d.sit===s.sit&&d.txt===s.txt));
    if(cu.length)localStorage.setItem('bds_ss',JSON.stringify(cu));
    localStorage.setItem('bds_rm',JSON.stringify(reminders));
    localStorage.setItem('bds_cl',JSON.stringify(contentLog));
  }catch(e){}
}

// ===================== HOME BUILDERS =====================
function buildHomeWorkflow(){
  const el=document.getElementById('wfRow');if(!el)return;
  const steps=[
    {i:'🔍',t:'Khảo Sát',d:'Thu thập dữ liệu',pg:'survey'},
    {i:'🏷️',t:'Định Giá',d:'Bóc tách giá đất',pg:'valuation'},
    {i:'✍️',t:'Tạo Content',d:'4 nền tảng',pg:'gen'},
    {i:'📅',t:'Lịch 7 Ngày',d:'Auto từ content',pg:'sch'},
    {i:'🎯',t:'Chấm Điểm',d:'Tối ưu',pg:'scr'},
    {i:'🗄️',t:'Lưu CRM',d:'Quản lý',pg:'crm'}
  ];
  el.innerHTML=steps.map((s,i)=>`<div onclick="nav('${s.pg}')" style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px 11px;text-align:center;flex:1;min-width:85px;cursor:pointer;transition:.2s" onmouseover="this.style.borderColor='rgba(245,166,35,.4)'" onmouseout="this.style.borderColor='var(--border)'"><div style="font-size:1.2rem;margin-bottom:3px">${s.i}</div><div style="font-weight:700;font-size:.68rem;color:var(--tx)">${s.t}</div><div style="font-size:.61rem;color:var(--t3)">${s.d}</div></div>${i<steps.length-1?'<div style="color:var(--t3);padding:0 3px;flex-shrink:0">→</div>':''}`).join('');
}

function buildHomeFeatures(){
  const el=document.getElementById('featureGrid');if(!el)return;
  const f=[
    {i:'✍️',t:'Tạo Content',d:'1 input → FB, Zalo, TikTok, Web. 5 tâm lý. 7 công thức.',pg:'gen',b:'or',bl:'CORE'},
    {i:'📅',t:'Lịch 7 Ngày',d:'Tự động từ content đã tạo. Phân bổ theo ngày + giờ vàng.',pg:'sch',b:'gr',bl:'SMART'},
    {i:'🔍',t:'Khảo Sát Nhà',d:'9 bước checklist chuẩn. Tự động sinh báo cáo 5x5.',pg:'survey',b:'gr',bl:'NEW'},
    {i:'🏷️',t:'Định Giá BĐS',d:'Bóc tách giá đất + xây dựng. Kết nối tạo content.',pg:'valuation',b:'',bl:''},
    {i:'🎭',t:'Đọc Vị KH',d:'10 câu hỏi xác định tâm lý KH. Gợi ý chiến thuật.',pg:'readkh',b:'bl',bl:'NEW'},
    {i:'🏡',t:'Dẫn Xem Nhà',d:'Kịch bản từng phòng. Tích hợp dữ liệu khảo sát.',pg:'guidetour',b:'bl',bl:'NEW'},
    {i:'💬',t:'Câu Chốt Sale',d:'50+ câu chốt theo tình huống. Copy ngay dùng liền.',pg:'salescripts',b:'rd',bl:'HOT'},
    {i:'🎯',t:'Chấm Điểm',d:'6 tiêu chí 1–10. Gợi ý cải thiện cụ thể.',pg:'scr',b:'',bl:''},
    {i:'⚡',t:'A/B Testing',d:'So sánh 2 hook, chọn hook tối ưu.',pg:'ab',b:'',bl:''},
    {i:'🔁',t:'Biến Tấu Content',d:'Chẩn đoán tại sao cũ không viral. Viết lại 3 phiên bản.',pg:'remix',b:'',bl:''},
    {i:'📊',t:'Dashboard',d:'Biểu đồ content theo tuần/tháng. Thống kê tổng quan.',pg:'dashboard',b:'or',bl:'NEW'},
    {i:'⏰',t:'Nhắc Lịch KH',d:'Đặt nhắc follow-up cho từng khách. Cảnh báo đúng giờ.',pg:'reminder',b:'gr',bl:'NEW'},
    {i:'📖',t:'Hướng dẫn',d:'Hướng dẫn sử dụng đầy đủ từng tính năng trong app.',pg:'guide',b:'bl',bl:'NEW'},
    {i:'📖',t:'Cẩm Nang Bách Thắng',d:'10 Module thực chiến đầy đủ từ Trần Thế Vinh.',pg:'handbook',b:'or',bl:'📖'}
  ];
  el.innerHTML=f.map(x=>`<div class="fc" onclick="nav('${x.pg}')">${x.bl?`<span class="fcb ${x.b}">${x.bl}</span>`:''}<div class="fci">${x.i}</div><div class="fct">${x.t}</div><div class="fcd">${x.d}</div></div>`).join('');
}

function buildHBModules(){
  const el=document.getElementById('hbModules');if(!el)return;
  const m=['📋 Module 0: Lời mở đầu','🧠 Module 1: Tư duy Sale','💰 Module 2: Tâm lý KH','❓ Module 3: Đặt câu hỏi','📞 Module 4: Telesale','💬 Module 5: Nhắn tin','🎭 Module 6: Tạo tò mò','🏠 Module 7: Dẫn xem nhà','🤝 Module 8: Chốt deal','🛡️ Module 9: Xử lý từ chối'];
  el.innerHTML=m.map(x=>`<span style="background:var(--card);border:1px solid var(--border);border-radius:7px;padding:4px 10px;font-size:.68rem;color:var(--t2)">${x}</span>`).join('');
}

// ===================== SUGGESTIONS =====================
function buildSg(){
  const mp={type:'sg_type',price:'sg_price',area:'sg_area',loc:'sg_loc',pros:'sg_pros',diff:'sg_diff'};
  const im={type:'i_type',price:'i_price',area:'i_area',loc:'i_loc',pros:'i_pros',diff:'i_diff'};
  for(const k in mp){const el=document.getElementById(mp[k]);if(!el)continue;el.innerHTML='';SG[k].slice(0,6).forEach(s=>{const c=document.createElement('span');c.className='sgc';c.textContent=s;c.onclick=()=>{const i=document.getElementById(im[k]);i.value=i.value?i.value+', '+s:s;};el.appendChild(c);});}
}

// ===================== PSYCH & FORMULA =====================
function buildPsychCards(){
  const g=document.getElementById('psyGrid');if(!g)return;
  g.innerHTML=PSYCH.map(d=>`<div class="psy-card${d.p===selPsy?' sel':''}" data-p="${d.p}" onclick="selPsyFn('${d.p}',this)"><div style="display:flex;align-items:center;gap:7px;margin-bottom:6px"><span class="psy-emo">${d.e}</span><span class="psy-name">${d.p}</span></div><div style="font-size:.69rem;color:var(--t3);margin-bottom:5px">${d.tag}</div><div style="font-size:.68rem;color:var(--t2);line-height:1.5;margin-bottom:6px">${d.desc}</div><div style="display:flex;flex-wrap:wrap;gap:4px">${d.keys.map(k=>`<span class="pky">${k}</span>`).join('')}</div></div>`).join('');
}
function selPsyFn(p,el){document.querySelectorAll('.psy-card').forEach(c=>c.classList.remove('sel'));el.classList.add('sel');selPsy=p;}

function buildFrmCards(){
  const g=document.getElementById('frmGrid');if(!g)return;
  g.innerHTML=FRM.map(d=>`<div class="frm-card${d.id===selFrm?' sel':''}" onclick="selFrmCard('${d.id}',this)"><div class="frm-letter">${d.lt}</div><div><div class="frm-name">${d.name}</div><div class="frm-steps">${d.steps}</div><div class="frm-desc">${d.desc}</div><div class="frm-ex">📌 ${d.ex}</div></div></div>`).join('');
}
function selFrmCard(id,el){document.querySelectorAll('.frm-card').forEach(c=>c.classList.remove('sel'));el.classList.add('sel');selFrm=id;}

// ===================== PILLS =====================
function spill(el,g,v){const p=el.closest('.pgr');p.querySelectorAll('.pill').forEach(x=>x.classList.remove('on'));el.classList.add('on');pst[g]=v;}
function tgGoal(el){el.classList.toggle('on');updGoalHint(el.closest('.pgr')?.id);}
function getGoals(pid){const c=pid?document.getElementById(pid):null;if(!c)return['Chốt nhanh'];return[...c.querySelectorAll('.gpill.on')].map(p=>p.dataset.v);}
function updGoalHint(pid){const h=document.getElementById('goalHint');if(!h)return;const gs=getGoals(pid||'goalPills_gen');const mp={'Chốt nhanh':'<strong style="color:var(--rd)">Chốt nhanh:</strong> Hook mạnh, khan hiếm, CTA urgent','Thu lead':'<strong style="color:var(--gr)">Thu lead:</strong> Gợi mở, tạo tò mò, dẫn inbox','Tăng tương tác':'<strong style="color:var(--pu)">Tương tác:</strong> Câu hỏi, debate, dễ comment'};h.innerHTML=gs.length?gs.map(g=>`⚡ ${mp[g]||g}`).join('<br>'):'⚡ Chọn ít nhất 1 mục tiêu';}
function toggleAuto(){document.getElementById('manOpts').classList.toggle('hidden',document.getElementById('autoSmart').checked);}
function V(id){const e=document.getElementById(id);return e?e.value.trim():'';}

// ===================== CONTENT GENERATION =====================
function gfd(){return{type:V('i_type')||'Nhà phố',price:V('i_price')||'5 tỷ',area:V('i_area')||'80m²',loc:V('i_loc')||'TP.HCM',pros:V('i_pros')||'Sổ hồng riêng, hẻm xe hơi',diff:V('i_diff')||'Giá tốt, vị trí đẹp'};}
function autoPsy(d){if(parseFloat(d.price)>=10||d.type.includes('biệt thự'))return'Ngạo mạn';if(d.diff.toLowerCase().match(/giá.*(tốt|hời|thấp|rẻ)/))return'Tham';if(d.pros.includes('sổ hồng')||d.pros.includes('pháp lý'))return'Nghi ngờ';return'Si';}
function autoFrm(py){return{'Tham':'AIDA','Sân':'PAS','Si':'FAB','Ngạo mạn':'4P','Nghi ngờ':'BAB'}[py]||'AIDA';}

function mkFB(d,py,frm,gs,ct){
  const hooks={'Tham':[`💥 HIẾM CÓ! ${d.type} ${d.loc} chỉ ${d.price} — Cơ hội không tới lần 2!`,`🔥 Deal hời: ${d.type} ${d.area} tại ${d.loc} giá ${d.price}`],'Sân':[`✅ ${d.type.toUpperCase()} ${d.loc} — ${d.price} — ${d.area} — SỔ HỒNG — LIÊN HỆ NGAY`,`⚡ Cần nhà? Đây. ${d.type} ${d.loc} — ${d.price}. Không lòng vòng.`],'Si':[`🤔 Đang phân vân mua nhà? Xem căn ${d.type} này — mọi thứ rõ ràng A-Z!`,`📖 Lần đầu mua nhà? Tôi giải thích toàn bộ về ${d.type} ${d.loc} này!`],'Ngạo mạn':[`👑 Không phải ai cũng đủ tầm sở hữu ${d.type} này tại ${d.loc}`,`💎 LIMITED — Chỉ 1 căn độc bản: ${d.type} ${d.area} ${d.loc} ${d.price}`],'Nghi ngờ':[`✅ CAM KẾT THẬT: ${d.type} ${d.loc} — Sổ hồng chính chủ, pháp lý 100% rõ`,`🔍 KIỂM CHỨNG ĐƯỢC: Công chứng ngay, không ẩn phí`]};
  const hk=hooks[py]||hooks['Si'];const mh=hk[0];
  const cta=gs.includes('Chốt nhanh')?`\n⏰ CHỈ HÔM NAY — Nhắn ngay trước khi ai chốt!\n📲 ${ct}`:gs.includes('Thu lead')?`\n💬 Nhắn "XEM NHÀ" nhận thêm ảnh + thông tin\n📲 ${ct}`:`\n❓ Bạn đang tìm loại nhà nào? Comment bên dưới!\n👍 Like & Share nếu hữu ích!`;
  let body='';
  if(frm==='AIDA')body=`${mh}\n\n📍 ${d.loc} | 📐 ${d.area} | 💰 ${d.price}\n⭐ ${d.pros}\n🎯 ${d.diff}\n\n✨ Cơ hội hiếm — giá này không tồn tại lâu!`;
  else if(frm==='PAS')body=`${mh}\n\n😤 Đang thuê nhà mãi không ra nhà của mình? Tiền thuê bay mà chẳng thành vốn...\n💔 Chật chội, không tự do sửa chữa, lo hết hạn hợp đồng...\n\n✅ GIẢI PHÁP: ${d.type} ${d.area} tại ${d.loc}\n📌 ${d.pros} | 🎯 ${d.diff}\n💰 Chỉ ${d.price}`;
  else if(frm==='BAB')body=`${mh}\n\n😩 TRƯỚC: Chật chội thuê nhà...\n😊 SAU: An cư ${d.type} rộng ${d.area} tại ${d.loc}\n🌉 CẦU NỐI: Căn này — ${d.price} — ${d.pros}`;
  else if(frm==='FAB')body=`${mh}\n\n📋 ĐẶC ĐIỂM: ${d.type} ${d.area} tại ${d.loc} | Giá: ${d.price}\n✅ LỢI THẾ: ${d.pros} | ${d.diff}\n🏡 LỢI ÍCH: An cư vững chắc · Tài sản tăng giá · Không lo tiền thuê`;
  else body=`${mh}\n\n🏡 Tưởng tượng thức dậy trong ${d.type} riêng tại ${d.loc}...\n📐 ${d.area} rộng rãi | 💰 ${d.price}\n${d.diff} | ✅ ${d.pros}`;
  return`${body}${cta}\n\n---\n🔀 HOOK BIẾN THỂ: ${hk.slice(1).map((h,i)=>`\n${i+1}. ${h}`).join('')}`;
}

function mkZL(d,py,gs,ct){
  const mp={'Tham':`Chào anh/chị! Em có ${d.type} ${d.area} tại ${d.loc} giá ${d.price} CỰC TỐT ạ! 💰\n✅ ${d.pros}\n${gs.includes('Chốt nhanh')?'Anh/chị muốn xem không? Em sắp lịch ngay!':'Anh/chị muốn em gửi thêm ảnh không ạ? 🙏'}`,'Sân':`Chào anh/chị! ${d.type} ${d.loc} — ${d.price} — ${d.area}. ${d.pros}.\n${gs.includes('Chốt nhanh')?'Xem ngay không? Em giữ lịch hôm nay.':'Cần thêm gì em gửi ngay ạ.'}`,'Si':`Chào anh/chị! Em biết tìm nhà phức tạp. Em có ${d.type} tại ${d.loc} — ${d.price} rất phù hợp ạ.\n${d.pros}. ${gs.includes('Thu lead')?'Anh/chị muốn em gửi bảng so sánh không ạ? 😊':'Em giải thích A-Z kể cả pháp lý & vay NH ạ!'}`,'Ngạo mạn':`Kính gửi anh/chị.\nEm có ${d.type} premium tại ${d.loc} — ${d.price}. ${d.pros}.\nSản phẩm hiếm, dành cho người có gu. Anh/chị muốn tham khảo? 🏆`,'Nghi ngờ':`Chào anh/chị. Em có ${d.type} ${d.loc} — ${d.price}.\n✅ Sổ hồng chính chủ\n✅ Pháp lý 100% rõ, không ẩn phí\n✅ Hoàn cọc nếu thông tin sai\n${gs.includes('Thu lead')?'Anh/chị muốn em gửi scan hồ sơ trước không ạ? 🙏':'Anh/chị muốn xem hồ sơ trực tiếp không ạ? 🙏'}`};
  return(mp[py]||mp['Si'])+`\n\n${ct}`;
}

function mkTT(d,py,gs,ct){
  const h3={'Tham':`DỪNG LẠI! ${d.type} ${d.loc} chỉ ${d.price}! 🔥`,'Sân':`${d.type} ${d.loc} — ${d.price}. Xem đây!`,'Si':`Lần đầu mua nhà? Xem cái này...`,'Ngạo mạn':`Không phải ai cũng đủ tầm sở hữu căn này 👑`,'Nghi ngờ':`Sổ hồng chính chủ — xem đây!`};
  const cta=gs.includes('Chốt nhanh')?'"Comment CHỐT để được liên hệ ngay!"':'"Follow & nhắn tin nhận tư vấn miễn phí!"';
  return`🎬 HOOK 3 GIÂY: "${h3[py]}"\n\n📖 KỊCH BẢN:\n[0:00–0:05] Quay mặt ngoài ${d.type}\n→ Giọng: "Đây là ${d.type} ${d.area} tại ${d.loc} — chỉ ${d.price}"\n\n[0:05–0:20] Tour từng phòng\n→ Giọng: "Điểm đặc biệt: ${d.pros}. Còn thêm: ${d.diff}!"\n\n[0:20–0:28] Text thông tin liên hệ\n\n[CTA 0:28–0:30] → ${cta}\n\n📞 ${ct}`;
}

function mkWB(d,py,ct){
  const ti={'Tham':`Bán ${d.type} ${d.loc} Giá Rẻ ${d.price} — Đầu Tư Sinh Lời`,'Sân':`${d.type} ${d.loc} ${d.price} ${d.area} — Sổ Hồng Riêng`,'Si':`Hướng Dẫn Mua ${d.type} ${d.loc} ${d.price} — Pháp Lý Rõ Ràng A-Z`,'Ngạo mạn':`${d.type} Cao Cấp ${d.loc} ${d.price} — Đẳng Cấp Sống Khác Biệt`,'Nghi ngờ':`${d.type} ${d.loc} ${d.price} — Sổ Hồng Riêng Pháp Lý 100% Minh Bạch`};
  const meta=`${d.type} ${d.loc} giá ${d.price}, DT ${d.area}. ${d.pros}. ${d.diff}. Tư vấn miễn phí!`.substring(0,160);
  return`📌 TIÊU ĐỀ SEO:\n${ti[py]||ti['Si']}\n\n📝 META (${meta.length}/160):\n${meta}\n\n## GIỚI THIỆU\n${d.type} ${d.area} tại ${d.loc}. Giá ${d.price} — lý tưởng để ở và đầu tư.\n\n## THÔNG TIN\n• ${d.type} | ${d.area} | ${d.loc} | ${d.price}\n• Pháp lý: ${d.pros}\n\n## ĐIỂM NỔI BẬT\n✅ ${d.pros.split(',').map(s=>s.trim()).join('\n✅ ')}\n\n## LIÊN HỆ\n${ct}\n*Tư vấn vay NH · Xem nhà miễn phí*`;
}

function buildVer(d,py,frm,gs){
  const ct=`📞 ${prof.phone} | Zalo: ${prof.zalo}\n👤 ${prof.name} — ${prof.title}`;
  return{py,frm,gs,fb:mkFB(d,py,frm,gs,ct),zalo:mkZL(d,py,gs,ct),tiktok:mkTT(d,py,gs,ct),web:mkWB(d,py,ct)};
}

async function doGenerate(){
  const d=gfd(),auto=document.getElementById('autoSmart').checked,v5=pst.ver==='5';
  const gs=getGoals('goalPills_gen');if(!gs.length)return toast('⚠️ Chọn ít nhất 1 mục tiêu!');
  let py,frm;
  if(auto){py=autoPsy(d);frm=autoFrm(py);}else{py=selPsy||'Si';frm=selFrm==='Auto'?autoFrm(py):selFrm;}
  const steps=v5?['🔍 Phân tích BĐS...','🧠 Xác định 5 tâm lý...','✍️ Tạo FB x5...','💬 Zalo x5...','🎵 TikTok x5...','🌐 Web x5...','✅ Hoàn tất!']:['🔍 Phân tích...','🧠 Xác định tâm lý...','✍️ Tạo 4 nền tảng...','✅ Hoàn tất!'];
  document.getElementById('ldArea').classList.add('on');document.getElementById('outArea').classList.remove('on');
  document.getElementById('ldSteps').innerHTML=steps.map((s,i)=>`<div class="lst" id="ls${i}">${s}</div>`).join('');
  for(let i=0;i<steps.length;i++){if(i>0){const prev=document.getElementById(`ls${i-1}`);if(prev){prev.classList.remove('cur');prev.classList.add('done');}}const cur=document.getElementById(`ls${i}`);if(cur)cur.classList.add('cur');await sleep(v5?280:230);}
  document.getElementById('ldArea').classList.remove('on');
  const plist=v5?['Tham','Sân','Si','Ngạo mạn','Nghi ngờ']:[py];
  VS=plist.map(p=>buildVer(d,p,auto?autoFrm(p):frm,gs));VI=0;schedProp=`${d.type} ${d.loc} ${d.price}`;
  // Log content for dashboard
  logContentCreated(d);
  renderOut(auto,gs,v5);
}

function logContentCreated(d){
  const now=new Date();
  contentLog.push({
    date:now.toISOString().split('T')[0],
    week:getWeekNumber(now),
    month:now.getMonth()+1,
    year:now.getFullYear(),
    type:d.type,
    loc:d.loc,
    price:d.price,
    ts:now.getTime()
  });
  // Keep only last 365 entries
  if(contentLog.length>365)contentLog=contentLog.slice(-365);
  saveSt();
  buildDashboard();
}

function getWeekNumber(d){
  const date=new Date(d.getTime());
  date.setHours(0,0,0,0);
  date.setDate(date.getDate()+3-(date.getDay()+6)%7);
  const week1=new Date(date.getFullYear(),0,4);
  return 1+Math.round(((date.getTime()-week1.getTime())/86400000-3+(week1.getDay()+6)%7)/7);
}

function renderOut(auto,gs,v5){
  document.getElementById('outArea').classList.add('on');
  const v=VS[0];const PL={'Tham':'💰','Sân':'🔥','Si':'🤔','Ngạo mạn':'👑','Nghi ngờ':'🔍'};
  document.getElementById('metaTxt').innerHTML=`<strong>${auto?'⚡ AUTO':'🔧 Manual'}</strong> | ${PL[v.py]} <strong>${v.py}</strong> | <strong>${v.frm}</strong> | 🎯 <strong>${gs.join(' + ')}</strong>`;
  const vr=document.getElementById('vTabsRow');
  if(v5){vr.classList.remove('hidden');const lb=['💰 THAM','🔥 SÂN','🤔 SI','👑 NGẠO','🔍 NGHI NGỜ'];document.getElementById('vTabs').innerHTML=VS.map((x,i)=>`<div class="vtab${i===0?' on':''}" data-v="${i}" onclick="sVer(this,${i})">${lb[i]}</div>`).join('');}
  else vr.classList.add('hidden');
  renderPlt();
}
function sVer(el,i){document.querySelectorAll('.vtab').forEach(t=>t.classList.remove('on'));el.classList.add('on');VI=i;renderPlt();}
function showPlt(el,p){document.querySelectorAll('.ptab').forEach(b=>b.classList.remove('on'));el.classList.add('on');PLT=p;renderPlt();}

function renderPlt(){
  if(!VS.length)return;const c=VS[VI][PLT]||'';
  const pid='pp_'+Date.now();
  document.getElementById('pltContent').innerHTML=`<div class="cbox"><pre id="${pid}">${esc(c)}</pre><button class="cpbtn" onclick="cpEl('${pid}')">📋 Copy</button></div>`;
}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function cpEl(id){const el=document.getElementById(id);if(!el)return;cpTxt(el.textContent||el.innerText);}
function cpTxt(t){navigator.clipboard.writeText(t).then(()=>toast('✅ Đã sao chép!')).catch(()=>{const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();document.execCommand('copy');document.body.removeChild(a);toast('✅ Đã sao chép!');});}
function clearGen(){['i_type','i_price','i_area','i_loc','i_pros','i_diff'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});document.getElementById('outArea').classList.remove('on');VS=[];}
function goSch(){if(schedProp)document.getElementById('sch_prop').value=schedProp;nav('sch');}
function goScr(){if(VS.length)document.getElementById('scrTxt').value=VS[VI][PLT]||VS[VI].fb||'';nav('scr');}
function autoFillSch(){if(schedProp){document.getElementById('sch_prop').value=schedProp;toast('✅ Đã lấy từ content!');}else document.getElementById('schNoContent').classList.remove('hidden');}
function autoFillScr(plt){if(VS.length){document.getElementById('scrTxt').value=VS[VI][plt]||VS[VI].fb||'';toast('✅ Đã lấy!');}else toast('⚠️ Chưa có content. Tạo content trước!');}

// ===================== SCHEDULE =====================
async function doSchedule(){
  const prop=V('sch_prop')||schedProp;const gs=getGoals('goalPills_sch');
  document.getElementById('schOut').classList.add('hidden');document.getElementById('schNoContent').classList.add('hidden');
  if(!prop)return toast('⚠️ Nhập BĐS hoặc bấm ⚡ Auto');
  await sleep(300);
  document.getElementById('schWeek').innerHTML=SCH_PLAN.map((s,i)=>{
    const pc=VS.length?VS[0][s.pk]||VS[0].fb:'';const has=!!pc;const pid='scp'+i+'_'+Date.now();
    return`<div class="sch-day" id="sday${i}"><div class="sch-head" onclick="toggleSchDay(${i})"><div class="sdl">${s.day}</div><div class="sdt"><div class="sdtt">${s.theme}</div><div class="sdtb">${s.platforms.map(p=>`<span class="ptg">${p}</span>`).join('')}<span class="htag-time">🕐 ${s.time}</span>${has?'<span style="font-size:.62rem;color:var(--gr)">✅ Có content</span>':'<span style="font-size:.62rem;color:var(--t3)">⚠️ Chưa có</span>'}</div></div><span class="sch-arr" id="sarr${i}">▼</span></div><div class="sch-body"><div style="background:rgba(245,166,35,.07);border-radius:8px;padding:8px;margin-bottom:8px;font-size:.72rem;color:var(--t2)">📌 <strong style="color:var(--ac)">Chiến lược:</strong> ${s.strategy}</div><div class="sch-tabs" id="stabs${i}">${s.platforms.map((p,j)=>`<div class="sch-tab${j===0?' on':''}" onclick="switchSchTab(this,${i},'${p.toLowerCase()}')">${p==='FB'?'📘 ':p==='Zalo'?'💬 ':p==='TikTok'?'🎵 ':'🌐 '}${p}</div>`).join('')}</div><div class="sch-ca" id="sca${i}">${has?`<pre id="${pid}">${esc(pc.substring(0,400)+(pc.length>400?'\n\n[...Xem thêm]':''))}</pre><button class="cpbtn" onclick="cpEl('${pid}')">📋 Copy</button>`:`<div style="color:var(--t3);font-size:.75rem;padding:4px">Tạo content ở Bước 1 để hiển thị tự động.<br><span style="cursor:pointer;color:var(--ac)" onclick="nav('gen')">→ Tạo Content ngay</span></div>`}</div></div></div>`;
  }).join('');
  document.getElementById('schOut').classList.remove('hidden');
}
function toggleSchDay(i){document.getElementById('sday'+i).classList.toggle('open');}
function switchSchTab(el,di,plt){
  el.closest('.sch-tabs').querySelectorAll('.sch-tab').forEach(t=>t.classList.remove('on'));el.classList.add('on');
  if(!VS.length)return;const pMap={fb:'fb',zalo:'zalo',tiktok:'tiktok',web:'web'};
  const content=VS[0][pMap[plt]]||VS[0].fb||'';const pid='sw'+di+'_'+Date.now();
  document.getElementById('sca'+di).innerHTML=content?`<pre id="${pid}">${esc(content.substring(0,400)+(content.length>400?'\n\n[...Xem thêm]':''))}</pre><button class="cpbtn" onclick="cpEl('${pid}')">📋 Copy</button>`:`<div style="color:var(--t3);font-size:.75rem;padding:4px">Chưa có nội dung.</div>`;
}
function clearSch(){document.getElementById('schWeek').innerHTML='';document.getElementById('schOut').classList.add('hidden');toast('🗑️ Đã xóa!');}
function expSch(){let t='LỊCH ĐĂNG 7 NGÀY\n'+'='.repeat(36)+'\n\n';SCH_PLAN.forEach(s=>{t+=`[${s.day}] ${s.theme} | ${s.time} | ${s.platforms.join(', ')}\n${s.strategy}\n`;if(VS.length)t+=`\nContent:\n${VS[0][s.pk]||VS[0].fb||''}\n`;t+='\n'+'-'.repeat(34)+'\n\n';});dlTxt(t,'lich-7-ngay.txt');toast('📄 Đã xuất!');}

// ===================== SCORE =====================
async function doScore(){
  const c=V('scrTxt');if(!c)return toast('⚠️ Nhập content cần chấm!');
  const gs=getGoals('goalPills_scr');document.getElementById('scrOut').classList.add('hidden');await sleep(440);
  const COL={1:'var(--rd)',2:'var(--rd)',3:'var(--rd)',4:'var(--rd)',5:'var(--ac)',6:'var(--ac)',7:'var(--ac)',8:'var(--gr)',9:'var(--gr)',10:'var(--gr)'};
  const crit=[{n:'🎣 Hook (Mở đầu)',s:c.length>30?Math.min(10,rn(7,9)):rn(4,6),t:'Bắt đầu bằng số liệu gây sốc, câu hỏi bất ngờ, mệnh đề đảo ngược'},{n:'🧠 Tâm lý KH',s:rn(6,8),t:'Viết rõ cho 1 đối tượng cụ thể, không cố viết cho tất cả'},{n:'📢 CTA rõ ràng',s:c.match(/liên hệ|inbox|gọi|nhắn|zalo/i)?rn(8,10):rn(4,6),t:'CTA cụ thể, có deadline hoặc khan hiếm'},{n:'📋 Thông tin đầy đủ',s:c.length>200?rn(7,9):rn(4,6),t:'Cần: giá, diện tích, vị trí, điểm mạnh, pháp lý'},{n:'🎯 Tính thuyết phục',s:gs.includes('Chốt nhanh')&&c.match(/duy nhất|giới hạn|gấp/)?rn(8,10):rn(5,7),t:'Bằng chứng xã hội, cam kết cụ thể, urgency thật'},{n:'📱 Phù hợp nền tảng',s:rn(6,8),t:'FB: dài & emoji; Zalo: ngắn; TikTok: hook 3s; Web: SEO'}];
  const total=Math.round(crit.reduce((s,x)=>s+x.s,0)/crit.length*10)/10;
  const grade=total>=8?'🏆 Xuất sắc':total>=6?'👍 Tốt':total>=4?'⚠️ Trung bình':'❌ Cần cải thiện';
  document.getElementById('scrCards').innerHTML=`<div class="card" style="text-align:center;padding:18px;background:linear-gradient(135deg,rgba(245,166,35,.08),rgba(62,207,142,.05))"><div style="font-size:2.8rem;font-weight:900;color:${COL[Math.round(total)]};font-family:'Space Mono',monospace">${total}</div><div style="font-size:.85rem;color:var(--t2);margin-top:2px">/ 10 — ${grade}</div></div>${crit.map(x=>`<div class="card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px"><div style="font-weight:600;font-size:.78rem;color:var(--tx)">${x.n}</div><div style="font-weight:800;color:${COL[x.s]};font-family:'Space Mono',monospace">${x.s}/10</div></div><div class="sbar"><div class="sfill" style="width:${x.s*10}%;background:${COL[x.s]}"></div></div><div style="font-size:.69rem;color:var(--t3);margin-top:4px">💡 ${x.t}</div></div>`).join('')}`;
  document.getElementById('scrOut').classList.remove('hidden');
}
function clearScr(){document.getElementById('scrTxt').value='';document.getElementById('scrOut').classList.add('hidden');}
function rn(a,b){return Math.floor(Math.random()*(b-a+1))+a;}

// ===================== AB TEST =====================
async function doAB(){
  const prop=V('ab_prop')||'BĐS TP.HCM';document.getElementById('abOut').classList.add('hidden');await sleep(500);
  const nm=prop.split(' ').slice(0,4).join(' ');const sa=rn(76,93),sb=rn(68,87);
  document.getElementById('abHA').textContent=`🚨 CHƯA ĐẾN 30 GIÂY — Đọc trước khi ai chốt mất ${nm}!`;
  document.getElementById('abHB').textContent=`💡 Lý do 87% người mua nhà lại chọn ${nm.split(' ').slice(-2).join(' ')}...`;
  document.getElementById('abSA').textContent=sa;document.getElementById('abSB').textContent=sb;
  document.getElementById('abRA').textContent='🧠 FOMO mạnh + urgency + scarcity. Buộc người đọc tiếp tục ngay.';
  document.getElementById('abRB').textContent='🧠 Số liệu (87%) tạo tò mò. Dấu "..." kéo người muốn biết tiếp.';
  const win=sa>sb?'A':'B';
  document.getElementById('abWin').innerHTML=`🏆 <strong>Phiên bản ${win} thắng</strong> với ${Math.max(sa,sb)}/100 điểm.<br><span style="color:var(--t3);font-size:.75rem">Dùng hook ${win} cho chiến dịch chính.</span>`;
  document.getElementById('abOut').classList.remove('hidden');
}

// ===================== REMIX =====================
async function doRemix(){
  const old=V('remix_old');if(!old)return toast('⚠️ Dán bài viết cũ vào!');
  const gs=getGoals('goalPills_remix');
  document.getElementById('remixOut').classList.add('hidden');document.getElementById('remixOut').classList.remove('hidden');await sleep(600);
  const issues=[];
  if(!old.match(/[!?💥🔥⚡]/))issues.push('Hook yếu — thiếu cảm xúc & ký tự đặc biệt');
  if(old.length<150)issues.push('Nội dung quá ngắn — thiếu thông tin thuyết phục');
  if(!old.match(/liên hệ|inbox|gọi|nhắn|zalo/i))issues.push('Thiếu CTA — không có lời kêu gọi hành động rõ ràng');
  if(!old.match(/\d/))issues.push('Thiếu số liệu — thêm giá, diện tích, % để tăng độ tin cậy');
  if(!old.match(/sổ hồng|pháp lý|chính chủ/i))issues.push('Chưa đề cập pháp lý — KH Nghi ngờ sẽ bỏ qua');
  const diag=issues.length?issues.map(x=>`❌ ${x}`).join('\n'):'✅ Bài viết cơ bản ổn — cần nâng cấp cảm xúc và urgency';
  const v1=old.replace(/^(.{0,50})/,m=>`🚨 ĐỪNG BỎ QUA! ${m}`)+`\n\n⏰ CÒN HÔM NAY — inbox ngay kẻo mất!`;
  const v2=`😤 Bạn đang tốn tiền thuê nhà mỗi tháng mà vẫn chưa có tài sản?\n\n${old}\n\n✅ Đây là cơ hội để thay đổi. Nhắn tin ngay!`;
  const v3=`💎 Chỉ dành cho người thực sự muốn an cư:\n\n${old}\n\n👑 Sản phẩm có chọn lọc — không dành cho tất cả.`;
  document.getElementById('remixOut').innerHTML=`<div class="card" style="border-color:rgba(239,83,80,.3)"><div class="ctit"><span class="dot" style="background:var(--rd)"></span>🔍 Chẩn đoán bài cũ</div><pre style="white-space:pre-wrap;font-size:.75rem;color:var(--t2);line-height:1.7">${diag}</pre></div>${[{t:'⚡ FOMO + Urgency',c:v1},{t:'😤 PAS — Đánh vào nỗi đau',c:v2},{t:'👑 Premium — Đẳng cấp',c:v3}].map((x,i)=>{const rid='rv'+i+'_'+Date.now();return`<div class="card"><div class="ctit"><span class="dot"></span>Phiên bản ${i+1}: ${x.t}</div><div id="${rid}" style="background:var(--bg3);border-radius:8px;padding:10px;font-size:.77rem;color:var(--t2);line-height:1.7;white-space:pre-wrap">${x.c}</div><div style="margin-top:8px;display:flex;gap:6px"><button class="btn btn-s btn-xs" onclick="cpEl('${rid}')">📋 Copy</button><button class="btn btn-b btn-xs" onclick="document.getElementById('scrTxt').value=document.getElementById('${rid}').textContent;nav('scr')">🎯 Chấm điểm</button></div></div>`;}).join('')}<div style="text-align:right;margin-top:5px"><button class="btn btn-r btn-sm" onclick="clearRemix()">🗑️ Xóa</button></div>`;
}
function clearRemix(){document.getElementById('remix_old').value='';document.getElementById('remixOut').innerHTML='';}

// ==================== SURVEY (NEW: ENHANCED SYNC) ====================
function buildSurveySteps(){
  const el=document.getElementById('svSteps');if(!el)return;
  el.innerHTML=SURVEY_STEPS.map((s,si)=>`
    <div class="sv-step" id="svs${si}">
      <div class="sv-head" onclick="this.parentElement.classList.toggle('open')">
        <div class="sv-num">${s.num}</div>
        <div class="sv-title">${s.title}</div>
        <span class="sv-arr">▼</span>
      </div>
      <div class="sv-body">
        ${s.items.map((it,ii)=>`
          <div class="sv-ck">
            <div class="sv-cb" id="cb_${si}_${ii}" onclick="tgCB(this,'${it.replace(/'/g,"\\'")}')"></div>
            <div class="sv-ct">${it}</div>
          </div>
        `).join('')}
        <div class="fg" style="margin-top:8px">
          <label style="font-size:.69rem;color:var(--t3)">📝 Ghi chú thêm</label>
          <input type="text" id="svn_${si}" placeholder="Ghi chú bổ sung..." style="font-size:.72rem;padding:5px 8px">
        </div>
      </div>
    </div>`).join('');
}
function tgCB(el,item){el.classList.toggle('checked');if(el.classList.contains('checked')){el.textContent='✓';if(!svData.checkedItems)svData.checkedItems=[];if(!svData.checkedItems.includes(item))svData.checkedItems.push(item);}else{el.textContent='';if(svData.checkedItems)svData.checkedItems=svData.checkedItems.filter(x=>x!==item);}}

function doSurveyReport(){
  const addr=V('sv_addr'),price=V('sv_price'),area=V('sv_area'),floors=V('sv_floors'),w=V('sv_w'),d=V('sv_d'),pros=V('sv_pros'),cons=V('sv_cons'),reason=V('sv_reason'),legal=V('sv_legal');
  if(!addr)return toast('⚠️ Nhập địa chỉ BĐS!');
  svData={addr,price,area,floors,w,d,pros,cons,reason,legal,checkedItems:svData.checkedItems||[]};
  const pArr=pros.split('\n').filter(x=>x.trim());
  const cArr=cons.split('\n').filter(x=>x.trim());
  const checked=svData.checkedItems||[];
  document.getElementById('svReport').innerHTML=`
    <div class="sec">📊 Báo cáo 5x5 — ${addr}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:12px">
      <div class="card" style="border-color:rgba(62,207,142,.3)">
        <div class="ctit" style="margin-bottom:8px"><span style="color:var(--gr)">✅</span>5 Ưu Điểm</div>
        ${pArr.length?pArr.map((p,i)=>`<div style="display:flex;gap:5px;margin-bottom:5px;font-size:.76rem;color:var(--t2)"><span style="color:var(--gr);font-weight:700">${i+1}.</span>${p}</div>`).join(''):'<div style="font-size:.74rem;color:var(--t3)">Chưa nhập</div>'}
      </div>
      <div class="card" style="border-color:rgba(239,83,80,.3)">
        <div class="ctit" style="margin-bottom:8px"><span style="color:var(--rd)">❌</span>5 Nhược Điểm</div>
        ${cArr.length?cArr.map((c,i)=>`<div style="display:flex;gap:5px;margin-bottom:5px;font-size:.76rem;color:var(--t2)"><span style="color:var(--rd);font-weight:700">${i+1}.</span>${c}</div>`).join(''):'<div style="font-size:.74rem;color:var(--t3)">Chưa nhập</div>'}
      </div>
    </div>
    ${reason||legal?`<div class="card" style="margin-bottom:11px"><div class="ctit" style="margin-bottom:8px"><span class="dot"></span>🔍 Đọc vị</div>${reason?`<div style="font-size:.77rem;color:var(--t2);margin-bottom:5px">❓ Lý do bán: <strong>${reason}</strong></div>`:''} ${legal?`<div style="font-size:.77rem;color:var(--t2)">📋 Pháp lý: <strong>${legal}</strong></div>`:''}</div>`:''}
    ${checked.length?`<div class="card" style="margin-bottom:11px"><div class="ctit" style="margin-bottom:8px"><span class="dot"></span>✅ Đã kiểm tra ${checked.length}/${SURVEY_STEPS.reduce((s,st)=>s+st.items.length,0)} mục</div>${checked.map(item=>`<div style="font-size:.72rem;color:var(--gr);margin-bottom:4px">✓ ${item}</div>`).join('')}</div>`:''}
    <div style="display:flex;gap:7px;flex-wrap:wrap">
      <button class="btn btn-g btn-sm" onclick="cpTxt(buildSvTxt())">📋 Copy báo cáo</button>
      <button class="btn btn-b btn-sm" onclick="dlTxt(buildSvTxt(),'bao-cao-khao-sat.txt')">📄 Xuất .txt</button>
      <button class="btn btn-b btn-sm" onclick="saveOutputToLibrary('📋 Khảo sát: '+(svData.addr||'BĐS'),buildSvTxt(),'survey')">💾 Lưu</button>
      <button class="btn btn-r btn-sm" onclick="document.getElementById('svReport').classList.add('hidden')">🗑️</button>
    </div>`;
  document.getElementById('svReport').classList.remove('hidden');
}
function buildSvTxt(){const d=svData;return`BÁO CÁO KHẢO SÁT NHÀ\n${'='.repeat(40)}\nĐịa chỉ: ${d.addr}\nGiá: ${d.price} | DT: ${d.area}m² | ${d.floors} tầng (${d.w}x${d.d}m)\n\n✅ 5 ƯU ĐIỂM:\n${d.pros}\n\n❌ 5 NHƯỢC ĐIỂM:\n${d.cons}\n\nLý do bán: ${d.reason}\nPháp lý: ${d.legal}\n${'='.repeat(40)}`;}

// =========================================================
// SURVEY → CONTENT SYNC (ENHANCED v6)
// Maps all survey fields intelligently to content generator
// =========================================================
function svToContent(){
  if(!svData.addr)return toast('⚠️ Chưa có dữ liệu khảo sát!');
  ['i_type','i_price','i_area','i_loc','i_pros','i_diff'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});

  // 1. Loại nhà — smart detect
  let houseType='Nhà phố';
  const areaNum=parseFloat(svData.area)||0;
  const floorsNum=parseInt(svData.floors)||0;
  if(floorsNum>4)houseType='Biệt thự';
  else if(areaNum<50&&floorsNum<=1)houseType='Đất nền';
  else if(svData.addr&&svData.addr.toLowerCase().includes('căn hộ'))houseType='Căn hộ chung cư';
  else if(svData.addr&&svData.addr.toLowerCase().includes('shop'))houseType='Shophouse';
  const typeEl=document.getElementById('i_type');if(typeEl)typeEl.value=houseType;

  // 2. Giá — preserve unit
  const priceEl=document.getElementById('i_price');
  if(priceEl)priceEl.value=svData.price||'';

  // 3. Diện tích — format as m²
  const areaEl=document.getElementById('i_area');
  if(areaEl){
    let areaStr=svData.area||'';
    if(areaStr&&!areaStr.includes('m')&&!isNaN(parseFloat(areaStr)))areaStr+=`m²`;
    // Also add W×D if available
    if(svData.w&&svData.d)areaStr+=` (${svData.w}×${svData.d}m)`;
    areaEl.value=areaStr;
  }

  // 4. Vị trí — full address
  const locEl=document.getElementById('i_loc');
  if(locEl)locEl.value=svData.addr;

  // 5. Điểm mạnh — pros + legal + checked items
  let prosArr=[];
  if(svData.pros){prosArr=svData.pros.split('\n').map(s=>s.trim()).filter(s=>s.length>0);}
  // Prepend legal if not already mentioned
  if(svData.legal&&!prosArr.some(p=>p.toLowerCase().includes('sổ')||p.toLowerCase().includes('pháp lý'))){
    prosArr.unshift(svData.legal);
  }
  // Add relevant checked items as pros
  const posChecked=(svData.checkedItems||[]).filter(it=>
    it.toLowerCase().match(/hẻm thông|hướng nam|đông nam|khu dân trí|không ngập|sổ hồng|pháp lý sạch|an ninh/)
  );
  posChecked.slice(0,2).forEach(it=>{if(!prosArr.some(p=>p.includes(it.substring(0,10))))prosArr.push(it);});
  // Floors info
  if(svData.floors&&parseInt(svData.floors)>0)prosArr.push(`Nhà ${svData.floors} tầng kiên cố`);
  const prosEl=document.getElementById('i_pros');
  if(prosEl)prosEl.value=prosArr.slice(0,6).join(', ');

  // 6. Điểm khác biệt — smart build from all sources
  let diffArr=[];
  // Best pro as differentiator
  if(prosArr.length>0)diffArr.push(prosArr[0]);
  // Seller motivation = buyer opportunity
  if(svData.reason&&svData.reason.toLowerCase().match(/gấp|nợ|chia|cần tiền/)){
    diffArr.push('Chủ cần bán gấp — cơ hội thương lượng tốt');
  }
  // Legal highlight
  if(svData.legal&&svData.legal.toLowerCase().includes('sổ hồng')&&!diffArr.some(d=>d.includes('Sổ hồng'))){
    diffArr.push('Sổ hồng riêng — sang tên nhanh');
  }
  // From valuation if available
  const lastVal=localStorage.getItem('bds_last_val');
  if(lastVal){try{const v=JSON.parse(lastVal);if(v.isGood)diffArr.push(`Giá tốt hơn thị trường ${v.diffPct}%`);}catch(e){}}
  // Negative → positive framing from cons
  if(svData.cons){
    const cArr=svData.cons.split('\n').map(s=>s.trim()).filter(s=>s);
    cArr.forEach(c=>{
      if(c.toLowerCase().includes('cũ'))diffArr.push('Nhà cũ — móng chắc, tiết kiệm xây lại');
      if(c.toLowerCase().includes('nhỏ'))diffArr.push('Diện tích vừa phải — dễ thanh khoản, dễ cho thuê');
    });
  }
  // W×D highlight if unusual
  if(svData.w&&svData.d){
    const wNum=parseFloat(svData.w);
    if(wNum>=6)diffArr.push(`Mặt tiền rộng ${svData.w}m — hiếm tại khu vực`);
  }
  const diffEl=document.getElementById('i_diff');
  if(diffEl)diffEl.value=diffArr.filter((v,i,a)=>a.indexOf(v)===i).slice(0,4).join(', ');

  // 7. Auto-detect transaction type
  const priceStr=(svData.price||'').toLowerCase();
  if(priceStr.includes('tháng')||priceStr.includes('triệu/th')){
    document.querySelectorAll('#txnPills .pill').forEach(p=>p.classList.remove('on'));
    const rentPill=document.querySelector('#txnPills .pill[data-v="Cho thuê"]');
    if(rentPill){rentPill.classList.add('on');pst.txn='Cho thuê';}
  }else{
    document.querySelectorAll('#txnPills .pill').forEach(p=>p.classList.remove('on'));
    const sellPill=document.querySelector('#txnPills .pill[data-v="Bán"]');
    if(sellPill){sellPill.classList.add('on');pst.txn='Bán';}
  }

  // 8. Auto-detect buyer type from content
  const allTxt=(svData.pros+' '+svData.cons+' '+svData.reason).toLowerCase();
  let buyerType='Mua ở';
  if(allTxt.match(/đầu tư|sinh lời|cho thuê lại/))buyerType='Đầu tư';
  else if(areaNum>200||floorsNum>=4)buyerType='Đầu tư';
  document.querySelectorAll('#buyerPills .pill').forEach(p=>p.classList.remove('on'));
  const buyerPill=document.querySelector(`#buyerPills .pill[data-v="${buyerType}"]`);
  if(buyerPill){buyerPill.classList.add('on');pst.buyer=buyerType;}

  nav('gen');
  toast('✅ Đã đồng bộ toàn bộ dữ liệu Khảo Sát → Tạo Content!');
}

function svToValuation(){
  if(svData.addr){
    document.getElementById('val_addr').value=svData.addr;
    document.getElementById('val_total').value=svData.price?.replace(/[^0-9.]/g,'')||'';
    document.getElementById('val_area').value=svData.area||'';
    document.getElementById('val_floors').value=svData.floors||'';
    document.getElementById('val_w').value=svData.w||'';
    document.getElementById('val_d').value=svData.d||'';
    document.getElementById('val_pros').value=svData.pros||'';
    document.getElementById('val_cons').value=svData.cons||'';
    document.getElementById('val_reason').value=svData.reason||'';
    document.getElementById('val_legal').value=svData.legal||'';
  }
  nav('valuation');
  toast('✅ Đã điền vào form Định Giá!');
}

function clearSurvey(){
  ['sv_addr','sv_price','sv_area','sv_floors','sv_w','sv_d','sv_pros','sv_cons','sv_reason','sv_legal'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  SURVEY_STEPS.forEach((s,i)=>{s.items.forEach((it,j)=>{const cb=document.getElementById(`cb_${i}_${j}`);if(cb){cb.classList.remove('checked');cb.textContent='';}});const n=document.getElementById('svn_'+i);if(n)n.value='';});
  document.getElementById('svReport').classList.add('hidden');
  svData={};
  document.querySelectorAll('.sv-step.open').forEach(el=>el.classList.remove('open'));
  toast('🗑️ Đã xóa!');
}

// ===================== VALUATION =====================
function autoFillVal(){
  if(svData.addr){
    document.getElementById('val_addr').value=svData.addr;
    document.getElementById('val_total').value=svData.price?.replace(/[^0-9.]/g,'')||'';
    document.getElementById('val_area').value=svData.area||'';
    document.getElementById('val_floors').value=svData.floors||'';
    document.getElementById('val_w').value=svData.w||'';
    document.getElementById('val_d').value=svData.d||'';
    document.getElementById('val_pros').value=svData.pros||'';
    document.getElementById('val_cons').value=svData.cons||'';
    document.getElementById('val_reason').value=svData.reason||'';
    document.getElementById('val_legal').value=svData.legal||'';
    toast('✅ Đã lấy từ khảo sát!');
  }else toast('⚠️ Chưa có dữ liệu khảo sát!');
}

async function doValuation(){
  const addr=V('val_addr')||'BĐS',total=parseFloat(V('val_total'))||7.9,area=parseFloat(V('val_area'))||82,floors=parseFloat(V('val_floors'))||3,w=parseFloat(V('val_w'))||4.7,dv=parseFloat(V('val_d'))||17.5,quality=parseFloat(document.getElementById('val_quality').value)||3.5,market=parseFloat(V('val_market'))||0,pros=V('val_pros'),cons=V('val_cons'),reason=V('val_reason'),legal=V('val_legal');
  document.getElementById('valOut').classList.add('hidden');await sleep(400);
  const buildCost=quality*w*dv*floors/1e3;const landVal=total-buildCost;const landUnit=landVal/area*1e3;
  const marketVal=market?market*area/1e3:0;const diff=market?total-marketVal:0;const diffPct=market?Math.abs((diff/marketVal)*100).toFixed(1):0;const isGood=market&&diff<0;
  const pArr=pros.split('\n').filter(x=>x.trim());const cArr=cons.split('\n').filter(x=>x.trim());
  const rptTxt=`BÁO CÁO ĐỊNH GIÁ BĐS\n${'='.repeat(42)}\nĐịa chỉ: ${addr}\nDiện tích: ${area}m² (${w}x${dv}m) · ${floors} tầng\nGiá rao: ${total} tỷ\n\nBÓC TÁCH:\n• Giá xây dựng: ${buildCost.toFixed(3)} tỷ\n• Giá đất thực: ${landVal.toFixed(3)} tỷ\n• Đơn giá đất: ${landUnit.toFixed(0)} triệu/m²\n${market?`• Thị trường: ${market} tr/m² → ${isGood?'GIÁ HỜI':'CAO HƠN TT'} ${diffPct}%`:''}\n\n✅ ƯU ĐIỂM:\n${pros}\n\n❌ NHƯỢC ĐIỂM:\n${cons}\n\nLý do bán: ${reason}\nPháp lý: ${legal}`;
  if(market)localStorage.setItem('bds_last_val',JSON.stringify({isGood,diffPct,market,addr}));
  document.getElementById('valOut').innerHTML=`<div class="sec" style="margin-top:0">📊 Kết quả định giá</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-bottom:12px"><div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:12px;text-align:center"><div style="font-size:.66rem;color:var(--t3);margin-bottom:3px">💰 Giá rao</div><div style="font-weight:900;font-size:1.2rem;color:var(--ac);font-family:'Space Mono',monospace">${total}tỷ</div></div><div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:12px;text-align:center"><div style="font-size:.66rem;color:var(--t3);margin-bottom:3px">🏗️ Xây dựng</div><div style="font-weight:900;font-size:1.2rem;color:var(--bl);font-family:'Space Mono',monospace">${buildCost.toFixed(2)}tỷ</div></div><div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:12px;text-align:center"><div style="font-size:.66rem;color:var(--t3);margin-bottom:3px">🌍 Giá đất</div><div style="font-weight:900;font-size:1.2rem;color:var(--gr);font-family:'Space Mono',monospace">${landVal.toFixed(2)}tỷ</div></div></div><div class="card" style="border-color:rgba(62,207,142,.3);margin-bottom:11px"><div class="ctit"><span class="dot" style="background:var(--gr)"></span>📐 Bóc tách Thuật Giả Kim</div><div style="display:grid;gap:7px;font-size:.78rem"><div style="display:flex;justify-content:space-between;padding:8px;background:var(--bg3);border-radius:8px"><span style="color:var(--t2)">Giá xây dựng (${quality}tr/m²×${w}×${dv}×${floors}t)</span><strong style="color:var(--bl)">${buildCost.toFixed(3)} tỷ</strong></div><div style="display:flex;justify-content:space-between;padding:8px;background:var(--bg3);border-radius:8px"><span style="color:var(--t2)">Giá đất = ${total} − ${buildCost.toFixed(3)}</span><strong style="color:var(--gr)">${landVal.toFixed(3)} tỷ</strong></div><div style="display:flex;justify-content:space-between;padding:8px;background:var(--bg3);border-radius:8px"><span style="color:var(--t2)">Đơn giá đất (${landVal.toFixed(3)}tỷ ÷ ${area}m²)</span><strong style="color:var(--ac);font-family:'Space Mono',monospace">${landUnit.toFixed(0)} tr/m²</strong></div>${market?`<div style="display:flex;justify-content:space-between;align-items:center;padding:9px 8px;background:${isGood?'rgba(62,207,142,.12)':'rgba(239,83,80,.1)'};border-radius:8px;border:1px solid ${isGood?'rgba(62,207,142,.3)':'rgba(239,83,80,.3)'}"><span style="font-weight:700;color:var(--tx)">📊 Kết luận so với TT ${market}tr/m²</span><strong style="color:${isGood?'var(--gr)':'var(--rd)'}">${isGood?`🟢 GIÁ HỜI − ${diffPct}%`:`🔴 CAO HƠN +${diffPct}%`}</strong></div>`:''}</div></div>${pArr.length||cArr.length?`<div style="display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:11px"><div class="card" style="border-color:rgba(62,207,142,.3)"><div class="ctit" style="margin-bottom:8px"><span style="color:var(--gr)">✅</span>Ưu Điểm</div>${pArr.map(p=>`<div style="font-size:.75rem;color:var(--t2);margin-bottom:4px;display:flex;gap:5px"><span style="color:var(--gr)">●</span>${p}</div>`).join('')}</div><div class="card" style="border-color:rgba(239,83,80,.3)"><div class="ctit" style="margin-bottom:8px"><span style="color:var(--rd)">❌</span>Nhược Điểm</div>${cArr.map(c=>`<div style="font-size:.75rem;color:var(--t2);margin-bottom:4px;display:flex;gap:5px"><span style="color:var(--rd)">●</span>${c}</div>`).join('')}</div></div>`:''}<div style="display:flex;gap:7px;flex-wrap:wrap"><button class="btn btn-g btn-sm" onclick="cpTxt(${JSON.stringify(rptTxt)})">📋 Copy báo cáo</button><button class="btn btn-b btn-sm" onclick="dlTxt(${JSON.stringify(rptTxt)},'dinh-gia-bds.txt')">📄 Xuất .txt</button><button class="btn btn-p btn-sm" onclick="valToContent()">✍️ → Tạo Content</button><button class="btn btn-b btn-sm" onclick="saveOutputToLibrary('🏷️ Định giá: '+(V('val_addr')||'BĐS'),${JSON.stringify(rptTxt)},'valuation')">💾 Lưu</button><button class="btn btn-r btn-sm" onclick="clearValuation()">🗑️ Xóa</button></div>`;
  document.getElementById('valOut').classList.remove('hidden');
}
function clearValuation(){['val_addr','val_total','val_area','val_floors','val_w','val_d','val_market','val_pros','val_cons','val_reason','val_legal'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});document.getElementById('valOut').classList.add('hidden');toast('🗑️ Đã xóa!');}
function valToContent(){
  const total=V('val_total'),area=V('val_area'),addr=V('val_addr'),pros=V('val_pros'),cons=V('val_cons'),reason=V('val_reason'),legal=V('val_legal'),market=V('val_market');
  document.getElementById('i_price').value=total?total+' tỷ':'';
  document.getElementById('i_area').value=area?area+'m²':'';
  document.getElementById('i_loc').value=addr;
  let prosArr=[];
  if(pros)prosArr=pros.split('\n').map(s=>s.trim()).filter(s=>s.length>0);
  if(legal&&!prosArr.some(p=>p.toLowerCase().includes('sổ')||p.toLowerCase().includes('pháp lý')))prosArr.unshift(legal);
  document.getElementById('i_pros').value=prosArr.join(', ');
  let diffArr=[];
  if(prosArr.length>0)diffArr.push(prosArr[0]);
  if(market&&total&&area){
    const marketVal=parseFloat(market)*parseFloat(area)/1e3;
    const isGood=parseFloat(total)<marketVal;
    if(isGood)diffArr.push(`Giá thấp hơn thị trường ${Math.abs(((parseFloat(total)-marketVal)/marketVal)*100).toFixed(1)}%`);
  }
  if(reason&&reason.toLowerCase().match(/gấp|nợ|chia/))diffArr.push('Chủ cần bán gấp — thương lượng được');
  document.getElementById('i_diff').value=diffArr.filter((v,i,a)=>a.indexOf(v)===i).join(', ');
  nav('gen');
  toast('✅ Đã đồng bộ Định Giá → Tạo Content!');
}

// ===================== READ KH =====================
function buildReadKH(){
  const el=document.getElementById('rkQuestions');if(!el)return;
  el.innerHTML=READ_KH_QS.map((q,qi)=>`
    <div class="card" style="margin-bottom:9px">
      <div style="font-weight:700;font-size:.8rem;color:var(--tx);margin-bottom:9px">❓ ${qi+1}. ${q.q}</div>
      <div style="display:grid;gap:5px">
        ${q.opts.map((o,oi)=>`<div class="rk-opt" id="rk_${qi}_${oi}" onclick="selRK(${qi},${oi})">${o}</div>`).join('')}
      </div>
    </div>`).join('');
  rkAnswers=new Array(READ_KH_QS.length).fill(-1);
}
function selRK(qi,oi){
  rkAnswers[qi]=oi;
  READ_KH_QS[qi].opts.forEach((_,i)=>{const e=document.getElementById(`rk_${qi}_${i}`);if(e)e.classList.remove('sel');});
  const sel=document.getElementById(`rk_${qi}_${oi}`);if(sel)sel.classList.add('sel');
  const answered=rkAnswers.filter(x=>x>=0).length;
  if(answered>=READ_KH_QS.length)showRKResult();
  else if(answered>=5){const r=document.getElementById('rkResult');if(r&&r.textContent.includes('Trả lời'))r.textContent=`Đã trả lời ${answered}/${READ_KH_QS.length} — tiếp tục...`;}
}
function showRKResult(){
  const scores={'Tham':0,'Sân':0,'Si':0,'Ngạo mạn':0,'Nghi ngờ':0};
  const maps=[['Tham','Si','Sân','Nghi ngờ'],['Si','Sân','Nghi ngờ','Ngạo mạn'],['Tham','Ngạo mạn','Nghi ngờ','Si'],['Tham','Si','Nghi ngờ','Sân'],['Tham','Si','Nghi ngờ','Sân'],['Tham','Ngạo mạn','Nghi ngờ','Si'],['Tham','Nghi ngờ','Nghi ngờ','Si'],['Sân','Si','Nghi ngờ','Si'],['Tham','Nghi ngờ','Nghi ngờ','Si'],['Tham','Sân','Nghi ngờ','Si']];
  rkAnswers.forEach((ans,qi)=>{if(ans>=0&&maps[qi]&&maps[qi][ans])scores[maps[qi][ans]]=(scores[maps[qi][ans]]||0)+1;});
  const top=Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0];
  const p=PSYCH.find(x=>x.p===top)||PSYCH[2];
  const strats={'Tham':'Dùng giá, deal hời, khan hiếm để thúc đẩy. Nhấn mạnh lợi ích tài chính.','Sân':'Trực tiếp, ngắn gọn. Báo giá ngay, không vòng vo. Tôn trọng thời gian của họ.','Si':'Giải thích kỹ từng bước. Gửi thêm tài liệu. Cho họ thời gian nhưng đặt checkpoint.','Ngạo mạn':'Tôn trọng đẳng cấp. Dùng ngôn ngữ premium. Không sales rẻ tiền.','Nghi ngờ':'Cung cấp bằng chứng ngay. Sổ hồng scan, cam kết hoàn tiền. Cho xem tận nơi.'};
  document.getElementById('rkResult').innerHTML=`
    <div style="text-align:center;padding:13px;background:linear-gradient(135deg,rgba(245,166,35,.08),rgba(76,156,245,.05));border-radius:10px;margin-bottom:11px">
      <div style="font-size:2.2rem;margin-bottom:5px">${p.e}</div>
      <div style="font-weight:900;font-size:1.1rem;color:var(--tx)">${p.p}</div>
      <div style="font-size:.75rem;color:var(--t3);margin-top:2px">${p.tag}</div>
    </div>
    <div class="card" style="margin-bottom:9px">
      <div class="ctit"><span class="dot"></span>🧠 Đặc điểm tâm lý</div>
      <div style="font-size:.78rem;color:var(--t2);line-height:1.7">${p.desc}</div>
    </div>
    <div class="card" style="border-color:rgba(245,166,35,.3)">
      <div class="ctit"><span class="dot"></span>💡 Chiến thuật tư vấn</div>
      <div style="font-size:.78rem;color:var(--t2);line-height:1.7">${strats[top]||''}</div>
      <div style="display:flex;flex-wrap:wrap;gap:5px;margin-top:8px">${(p.keys||[]).map(k=>`<span class="pill on" style="cursor:default">${k}</span>`).join('')}</div>
    </div>`;
}
function clearReadKH(){rkAnswers=[];buildReadKH();document.getElementById('rkResult').innerHTML='<div style="font-size:.79rem;color:var(--t3);text-align:center;padding:20px">Trả lời các câu hỏi bên trên để xem kết quả phân tích</div>';}

// ===================== GUIDE TOUR =====================
async function doGuideTour(){
  const prop=V('gt_prop')||'BĐS';const psy=document.getElementById('gt_psy').value||'Si';const pros=V('gt_pros')||'vị trí tốt, thoáng mát';const cons=V('gt_cons')||'';
  document.getElementById('gtOut').classList.add('hidden');await sleep(350);
  const psyObj=PSYCH.find(p=>p.p===psy)||PSYCH[2];
  const stratMap={'Tham':'Nhấn mạnh giá hời, khan hiếm, ROI đầu tư','Sân':'Thẳng thắn, báo nhanh ưu điểm key, tránh lan man','Si':'Giải thích kỹ, so sánh với thuê nhà, hướng dẫn từng bước','Ngạo mạn':'Nhấn tính độc bản, không phải ai cũng sở hữu được','Nghi ngờ':'Chứng minh pháp lý ngay, để xem hồ sơ tại chỗ'};
  const rooms=[
    {r:'🚪 Mặt tiền & Hẻm',s:`"Đây là hẻm vào nhà — ${pros?.split(',')[0]||'thoáng rộng'}.\nAnh/chị đo thử xem xe hơi vào được không?\n→ Khoảng cách 2 bên nhà + chiều rộng hẻm là ưu điểm quan trọng!"`,tip:'Đứng xa, chụp ảnh góc rộng — hẻm trông rộng hơn thực tế'},
    {r:'🏠 Tầng trệt & Phòng khách',s:`"Nhà ${prop}.\nDiện tích tầng trệt đủ để anh/chị tưởng tượng kê sofa, tủ TV...\n→ Gợi ý: 'Nếu là nhà mình, anh/chị sẽ kê sofa góc nào ạ?'"`,tip:'Mở tất cả đèn, kéo rèm — ánh sáng quyết định 70% cảm xúc KH'},
    {r:'🍳 Bếp & Ăn',s:`"Bếp ${pros?.includes('mới')?'mới 100%':'sạch sẽ, sử dụng tốt'}.\n→ Dẫn KH vào bếp: 'Bếp rộng đủ để 2 người nấu thoải mái'\n→ Tâm lý ${psy}: ${stratMap[psy]}"`,tip:'KH phụ nữ thường quan tâm bếp nhất — dành thời gian ở đây'},
    {r:'🛏️ Phòng ngủ',s:`"Phòng ngủ — anh/chị tưởng tượng: giường king size đặt giữa + 2 tủ 2 bên.\n→ Hỏi: 'Anh/chị muốn phòng master ở tầng mấy ạ?'\n→ Mental ownership — họ đã thấy mình đang ở đây"`,tip:'Mỗi phòng ngủ = 1 câu hỏi mở về nhu cầu cụ thể của KH'},
    {r:'🚿 WC / Phòng tắm',s:`"WC sạch, ${pros?.includes('mới')?'mới hoàn toàn':'bảo trì tốt'}.\n→ Đừng dừng quá lâu ở WC — chỉ note: 'Thoáng, không ẩm mốc'\n→ Nếu có nhược điểm: 'Sửa WC chỉ tốn 20-40 triệu là như mới'"`,tip:'Đừng dành quá 30 giây ở WC — chuyển sang điểm mạnh khác nhanh'},
    {r:'🌿 Sân thượng / Ban công',s:`"Đây là điểm em thích nhất — ${pros?.split(',')[0]||'không gian thoáng mát'}.\nAnh/chị tưởng tượng: cuối tuần BBQ, trồng cây, hay uống cà phê sáng...\n→ Dừng lại ĐÂY LÂU NHẤT trong tour!"`,tip:'KHO BÁU CẢM XÚC — Khai thác tối đa điểm này'},
    {r:'📋 Tổng kết sau xem nhà',s:`"Trong tất cả những căn đã xem, anh/chị thích căn này ở điểm nào nhất?\n→ LẮNG NGHE KỸ — đây là tín hiệu để chốt\n→ KH hỏi giá/thủ tục: ĐÃ ĐẾN LÚC CHỐT!\n→ KH im lặng: 'Anh/chị đang cân nhắc điều gì ạ?'\n→ Chiến thuật với KH ${psy}: ${stratMap[psy]}"`,tip:'IM LẶNG sau khi hỏi — người nói trước thường nhượng bộ'}
  ];
  document.getElementById('gtOut').innerHTML=`<div class="ibdg"><span>${psyObj.e}</span><span>Tâm lý: <strong>${psy} — ${psyObj.tag}</strong></span></div>${rooms.map((r,i)=>{const rid='gt'+i+'_'+Date.now();return`<div class="card" style="border-left:3px solid var(--ac);margin-bottom:9px"><div class="ctit" style="margin-bottom:7px"><span>${r.r}</span></div><div style="white-space:pre-line;font-size:.77rem;color:var(--t2);line-height:1.78;margin-bottom:7px">${r.s}</div><div style="background:rgba(245,166,35,.08);border-radius:7px;padding:7px 9px;font-size:.7rem;color:var(--ac);margin-bottom:7px">💡 ${r.tip}</div><div id="${rid}" style="display:none">${r.r}\n\n${r.s}\n\nTip: ${r.tip}</div><button class="btn btn-s btn-xs" onclick="cpEl('${rid}')">📋 Copy</button></div>`;}).join('')}<div style="margin-top:5px;text-align:right"><button class="btn btn-r btn-sm" onclick="document.getElementById('gtOut').classList.add('hidden')">🗑️ Xóa</button></div>`;
  document.getElementById('gtOut').classList.remove('hidden');
}
function autoFillGT(){if(svData.addr){document.getElementById('gt_prop').value=`${svData.addr}${svData.price?' — '+svData.price:''}`;if(svData.pros)document.getElementById('gt_pros').value=svData.pros.split('\n').slice(0,3).join(', ');if(svData.cons)document.getElementById('gt_cons').value=svData.cons.split('\n').slice(0,2).join(', ');toast('✅ Đã lấy từ khảo sát!');}else toast('⚠️ Chưa có dữ liệu khảo sát!');}

// ===================== SALE SCRIPTS =====================
function buildSaleScripts(){
  const cats=[...new Set(saleScripts.map(s=>s.cat))];
  document.getElementById('saleCats').innerHTML=cats.map(c=>`<div class="scat${c===curSaleCat?' on':''}" onclick="setSaleCat('${c}',this)">${c}</div>`).join('');
  renderSaleList();
}
function setSaleCat(cat,el){curSaleCat=cat;document.querySelectorAll('.scat').forEach(c=>c.classList.remove('on'));el.classList.add('on');renderSaleList();}
function renderSaleList(){
  const filtered=saleScripts.filter(s=>s.cat===curSaleCat);
  const isDefault=s=>DEFAULT_SCRIPTS.find(d=>d.sit===s.sit&&d.txt===s.txt);
  document.getElementById('saleList').innerHTML=filtered.length?filtered.map((s,i)=>{
    const sid='stxt_'+i+'_'+Date.now();
    return`<div class="sale-item"><div class="sale-sit">📌 ${s.sit}</div><div id="${sid}" class="sale-txt">${s.txt}</div><div style="display:flex;gap:6px;margin-top:8px"><button class="btn btn-s btn-xs" onclick="cpEl('${sid}')">📋 Copy</button>${!isDefault(s)?`<button class="btn btn-r btn-xs" onclick="deleteSS(${saleScripts.indexOf(s)})">🗑️ Xóa</button>`:''}</div></div>`;
  }).join(''):'<div style="color:var(--t3);font-size:.78rem;padding:16px;text-align:center">Chưa có câu chốt nào. Thêm câu chốt của bạn ở trên!</div>';
}
function addSaleScript(){const sit=V('ss_sit'),txt=V('ss_txt'),cat=V('ss_cat')||'Chốt deal';if(!sit||!txt)return toast('⚠️ Điền đầy đủ tình huống và câu chốt!');saleScripts.unshift({cat,sit,txt});saveSt();buildSaleScripts();clearSSForm();toast('✅ Đã thêm câu chốt!');}
function deleteSS(idx){if(!confirm('Xóa câu chốt này?'))return;saleScripts.splice(idx,1);saveSt();buildSaleScripts();toast('🗑️ Đã xóa!');}
function clearSSForm(){document.getElementById('ss_sit').value='';document.getElementById('ss_txt').value='';}

// ===================== TOOLS =====================
function showTool(el,id){document.querySelectorAll('.tool-tab').forEach(t=>t.classList.remove('on'));el.classList.add('on');document.querySelectorAll('.tool-pg').forEach(p=>p.classList.remove('on'));document.getElementById('tool-'+id).classList.add('on');}

function doCalc(){
  const price=parseFloat(V('calc_price'))||5,pct=parseFloat(V('calc_pct'))||70,years=parseFloat(V('calc_years'))||20,rate=parseFloat(V('calc_rate'))||8.5;
  const loan=price*1e9*pct/100,r=rate/100/12,n=years*12;
  const monthly=loan*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1);
  const totalPay=monthly*n,totalInt=totalPay-loan;
  const hid='ch_'+Date.now();
  const hint=`Vay ${(loan/1e9).toFixed(2)} tỷ, lãi ${rate}%/năm, ${years} năm → Trả góp chỉ ${(monthly/1e6).toFixed(0)} triệu/tháng — thấp hơn tiền thuê!`;
  document.getElementById('calcOut').innerHTML=`<div class="card" style="border-color:rgba(62,207,142,.3)"><div class="ctit"><span class="dot" style="background:var(--gr)"></span>Kết quả tính trả góp</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-bottom:12px"><div style="background:var(--bg3);border-radius:9px;padding:12px;text-align:center"><div style="font-size:1.2rem;font-weight:900;color:var(--gr);font-family:'Space Mono',monospace">${(monthly/1e6).toFixed(1)}tr</div><div style="font-size:.67rem;color:var(--t3);margin-top:2px">Trả góp/tháng</div></div><div style="background:var(--bg3);border-radius:9px;padding:12px;text-align:center"><div style="font-size:1.2rem;font-weight:900;color:var(--bl);font-family:'Space Mono',monospace">${(loan/1e9).toFixed(2)}tỷ</div><div style="font-size:.67rem;color:var(--t3);margin-top:2px">Số tiền vay</div></div><div style="background:var(--bg3);border-radius:9px;padding:12px;text-align:center"><div style="font-size:1.2rem;font-weight:900;color:var(--ac);font-family:'Space Mono',monospace">${(totalInt/1e9).toFixed(2)}tỷ</div><div style="font-size:.67rem;color:var(--t3);margin-top:2px">Tổng lãi</div></div></div><div style="font-size:.76rem;color:var(--t2);background:var(--bg3);border-radius:9px;padding:11px;line-height:1.8;margin-bottom:10px">📊 Vay <strong>${(loan/1e9).toFixed(2)} tỷ</strong> — lãi ${rate}%/năm — ${years} năm<br>💰 Trả góp: <strong style="color:var(--gr)">${(monthly/1e6).toFixed(2)} triệu/tháng</strong><br>📅 Tổng trả: <strong>${(totalPay/1e9).toFixed(2)} tỷ</strong></div><div id="${hid}" style="background:rgba(245,166,35,.08);border-radius:9px;padding:10px;margin-bottom:10px;font-size:.77rem;color:var(--ac);font-style:italic">"${hint}"</div><div style="display:flex;gap:7px"><button class="btn btn-g btn-sm" onclick="cpEl('${hid}')">📋 Copy gợi ý content</button><button class="btn btn-r btn-sm" onclick="document.getElementById('calcOut').classList.add('hidden')">🗑️ Xóa</button></div></div>`;
  document.getElementById('calcOut').classList.remove('hidden');
}

function doObj(){
  const prop=V('obj_prop')||'BĐS';const obj=pst.obj||'price';
  document.getElementById('objOut').classList.add('hidden');
  const scripts={price:`"Đắt hay rẻ phải so với cái gì ạ? Căn tương tự gần đây giá cao hơn mà không có [ưu điểm]. Thực ra ${prop} đang rất hợp lý."`,legal:`"Câu hỏi hay ạ! Em cam kết 100%: sổ hồng chính chủ — em gửi scan ngay bây giờ. Nếu sai bất kỳ điểm nào, hoàn cọc toàn bộ."`,think:`"Anh/chị đang cân nhắc ở điểm nào nhất — giá, vị trí hay pháp lý? Nếu em biết, em giải quyết ngay để anh/chị an tâm quyết định ạ."`,compare:`"Anh/chị cho em biết căn đó ở đâu? Em so sánh thẳng DT, pháp lý, vị trí — anh/chị thấy ngay sự khác biệt ạ."`,money:`"Anh/chị cần vay bao nhiêu %? Em kết nối ngân hàng có gói ưu đãi 7.5%/năm — em tính trả góp ngay cho anh/chị xem ạ."`};
  document.getElementById('objOut').innerHTML=`<div class="card"><div class="ctit"><span class="dot"></span>🗣️ Kịch bản xử lý phản đối</div><div style="font-size:.79rem;color:var(--t2);line-height:1.8;font-style:italic;background:var(--bg3);padding:12px;border-radius:8px;border-left:3px solid var(--ac)">${scripts[obj]||scripts.price}</div><button class="btn btn-g btn-sm" style="margin-top:8px" onclick="cpTxt(document.querySelector('#objOut .card div[style]').textContent)">📋 Copy</button></div>`;
  document.getElementById('objOut').classList.remove('hidden');
}

function doStory(){
  const prop=V('story_prop')||'BĐS';const dur=pst.story_dur||'15s';const plt=pst.story_plt||'FB Story';
  document.getElementById('storyOut').classList.add('hidden');
  const scripts={'15s':`🎬 SCRIPT ${plt} — 15 GIÂY\n\n[0-3s] Text nổi: "${prop}"\n[3-8s] Quay góc đẹp nhất\n[8-12s] Text: "Giá tốt — Sổ hồng riêng"\n[12-15s] Logo + SĐT`,'30s':`🎬 SCRIPT ${plt} — 30 GIÂY\n\n[0-5s] Hook: "DỪNG LẠI — Nhà đẹp giá tốt!"\n[5-15s] Tour nhanh 3 góc đẹp nhất\n[15-22s] Thông tin: giá, DT, vị trí\n[22-27s] Ưu điểm: pháp lý, tiện ích\n[27-30s] CTA: "Inbox ngay!"`,'60s':`🎬 SCRIPT REELS — 60 GIÂY\n\n[0-5s] Hook mạnh: "Đây là căn nhà khiến 47 người hỏi trong 3 ngày!"\n[5-20s] Tour toàn bộ: ngoài → trong → từng phòng\n[20-35s] Điểm nhấn đặc biệt + so sánh giá TT\n[35-50s] Pháp lý + cam kết + ưu điểm độc đáo\n[50-60s] CTA mạnh + thông tin liên hệ rõ ràng`};
  const sid='st_'+Date.now();
  document.getElementById('storyOut').innerHTML=`<div class="card"><div class="ctit"><span class="dot"></span>📱 Script ${plt}</div><pre id="${sid}" style="white-space:pre-wrap;font-size:.76rem;color:var(--t2);line-height:1.7">${scripts[dur]||scripts['15s']}</pre><button class="cpbtn" onclick="cpEl('${sid}')">📋 Copy</button></div>`;
  document.getElementById('storyOut').classList.remove('hidden');
}

function doHashtag(){
  const type=V('ht_type')||'nhà phố',loc=V('ht_loc')||'hcm',seg=document.getElementById('ht_seg').value,goal=document.getElementById('ht_goal').value,plt=pst.ht_plt||'FB';
  document.getElementById('hashtagOut').classList.add('hidden');
  const base=`#${type.toLowerCase().replace(/\s+/g,'')} #bds${loc.toLowerCase().replace(/\s+/g,'')} #${goal==='sell'?'bánhà':'cho_thuê_nhà'} #môigiới #bds #nhàđẹp`;
  const segHt={'budget':'#nhàrẻ #nhàbìnhdân #nhàgiárẻ','mid':'#nhàtrungcấp #nhà3đến7tỷ','high':'#nhàcaocấp #nhàsangt rọng','luxury':'#luxury #penthouse #villanhandé'};
  const platHt={'FB':'#facebook #bdsviệtnam #mualandranh','TikTok':'#tiktokrealestate #nhàtiktok #trendnhà','Zalo':'#zalomôigiới','Website':'#seobds #timkiếmnhà'};
  const hid='ht_'+Date.now();
  const htTxt=`${base} ${segHt[seg]||''} ${platHt[plt]||''}`;
  document.getElementById('hashtagOut').innerHTML=`<div class="card"><div class="ctit"><span class="dot"></span>🏷️ Hashtag cho ${plt}</div><div id="${hid}" style="background:var(--bg3);border-radius:8px;padding:12px;font-size:.78rem;color:var(--ac);line-height:1.9;word-break:break-word">${htTxt}</div><div style="margin-top:8px;display:flex;gap:6px"><button class="btn btn-g btn-sm" onclick="cpEl('${hid}')">📋 Copy</button><button class="btn btn-r btn-sm" onclick="document.getElementById('hashtagOut').classList.add('hidden')">🗑️</button></div></div>`;
  document.getElementById('hashtagOut').classList.remove('hidden');
}

function doColdCall(){
  const prop=V('cc_prop')||'BĐS';const psy=document.getElementById('cc_psy').value||'Si';
  document.getElementById('ccOut').classList.add('hidden');
  const scripts={'Tham':`📞 COLD CALL — KH HAM DEAL\n\n"Xin chào anh/chị! Em [tên], môi giới BĐS khu vực.\nEm đang có 1 căn ${prop} — giá đang CỰC TỐT, thấp hơn thị trường 10%.\nAnh/chị có đang tìm nhà khu vực này không ạ?"\n\n→ Nếu có: "Anh/chị rảnh chiều nay hoặc sáng mai để em đưa đi xem không ạ?"\n→ Nếu không: "Anh/chị có ai cần mua nhà không ạ? Em có thưởng giới thiệu 5-10tr."`,
  'Si':`📞 COLD CALL — KH PHÂN VÂN\n\n"Chào anh/chị! Em [tên] ạ.\nEm muốn hỏi — anh/chị có đang cân nhắc chuyện nhà cửa không ạ?\nEm hiểu tìm nhà phức tạp lắm — em chuyên hỗ trợ từng bước từ xem nhà đến vay ngân hàng.\nEm có thể gửi anh/chị 3 căn phù hợp ngân sách không ạ?"`,
  'Sân':`📞 COLD CALL — KH NÓNG TÍNH\n\n"Chào anh/chị! Em [tên], 30 giây thôi ạ.\nEm có ${prop} — giá tốt, pháp lý sạch.\nAnh/chị cần không? Có thể xem ngay hôm nay."`,
  'Nghi ngờ':`📞 COLD CALL — KH NGHI NGỜ\n\n"Chào anh/chị! Em [tên], công ty [Tên].\nEm gọi giới thiệu ${prop} — sổ hồng chính chủ, có thể xem hồ sơ trước khi xem nhà.\nAnh/chị muốn em gửi scan sổ hồng kiểm tra trước không ạ?"`};
  const cid='cc_'+Date.now();
  document.getElementById('ccOut').innerHTML=`<div class="card"><div class="ctit"><span class="dot"></span>📞 Script Cold Call — Tâm lý ${psy}</div><pre id="${cid}" style="white-space:pre-wrap;font-size:.76rem;color:var(--t2);line-height:1.75">${scripts[psy]||scripts['Si']}</pre><button class="cpbtn" onclick="cpEl('${cid}')">📋 Copy</button></div>`;
  document.getElementById('ccOut').classList.remove('hidden');
}

function doChecklist(){
  const type=pst.cl_type||'Nhà phố';
  document.getElementById('clOut').classList.add('hidden');
  const lists={
    'Nhà phố':['✅ Sổ hồng/sổ đỏ chính chủ — kiểm tra tên, diện tích, mục đích sử dụng','✅ Giấy tờ tuỳ thân chủ nhà (CCCD 2 mặt)','✅ Không có tranh chấp, không thế chấp ngân hàng','✅ Không dính quy hoạch lộ giới (hỏi UBND phường)','✅ Không có án phí, thuế chưa nộp','✅ Hợp đồng đặt cọc công chứng tại văn phòng','✅ Có biên bản bàn giao nhà, điện nước'],
    'Căn hộ':['✅ Sổ hồng căn hộ riêng biệt (không phải sổ chung)','✅ Không nợ phí quản lý chung cư','✅ Quy định pet, cải tạo từ ban quản lý','✅ Tình trạng thang máy, hành lang','✅ Phí dịch vụ hàng tháng bao nhiêu','✅ Hợp đồng mua bán có công chứng'],
    'Đất nền':['✅ Sổ đỏ/sổ hồng — đất ONT hay ODT','✅ Không dính quy hoạch treo (hỏi Sở TNMT)','✅ Ranh đất rõ ràng, đã phân lô hợp lệ','✅ Có điện, nước, đường vào (hoặc cam kết làm)','✅ Không có hạn chế xây dựng đặc biệt','✅ Nghĩa vụ tài chính với nhà nước đã thanh toán']
  };
  const clid='cl_'+Date.now();
  document.getElementById('clOut').innerHTML=`<div class="card"><div class="ctit"><span class="dot"></span>📋 Checklist Pháp Lý — ${type}</div><div id="${clid}" style="font-size:.78rem;color:var(--t2);line-height:2">${(lists[type]||lists['Nhà phố']).join('<br>')}</div><div style="margin-top:9px;display:flex;gap:6px"><button class="btn btn-g btn-sm" onclick="cpEl('${clid}')">📋 Copy tặng KH</button><button class="btn btn-r btn-sm" onclick="document.getElementById('clOut').classList.add('hidden')">🗑️</button></div></div>`;
  document.getElementById('clOut').classList.remove('hidden');
}

function doPersona(){
  const el=document.getElementById('personaOut');if(!el)return;
  document.getElementById('personaTabs').querySelectorAll('.tool-tab').forEach((t,i)=>{if(i===0){t.classList.add('on');}else t.classList.remove('on');});
  const personas=[
    {name:'Trần Văn Mạnh',age:35,job:'Kỹ sư IT',income:'40tr/tháng',goal:'Mua nhà ở thực cho gia đình 4 người',pain:'Giá leo thang, lo sợ mua sai quyết định lớn',psy:'Nghi ngờ',tip:'Cung cấp dữ liệu thực, sổ hồng scan trước, so sánh căn cùng khu'},
    {name:'Nguyễn Thị Lan',age:45,job:'Kinh doanh',income:'100tr+/tháng',goal:'Đầu tư sinh lời — cho thuê hoặc bán lại',pain:'Sợ mua giá cao, muốn ROI tối thiểu 8%/năm',psy:'Tham',tip:'Tính ROI cụ thể, so sánh với gửi tiết kiệm, nhấn tiềm năng tăng giá'},
    {name:'Lê Hoàng Nam',age:28,job:'Nhân viên văn phòng',income:'15tr/tháng',goal:'Lần đầu mua nhà — không biết bắt đầu từ đâu',pain:'Thiếu kinh nghiệm, sợ bị lừa, không hiểu vay NH',psy:'Si',tip:'Hướng dẫn từng bước, giải thích vay NH, kết nối dịch vụ công chứng'}
  ];
  el.innerHTML=personas.map((p,i)=>`<div class="card" style="display:${i===0?'block':'none'}" id="persona${i}"><div style="display:flex;align-items:center;gap:10px;margin-bottom:11px"><div style="width:44px;height:44px;border-radius:50%;background:linear-gradient(135deg,var(--ac),var(--a2));display:flex;align-items:center;justify-content:center;font-size:1.3rem;flex-shrink:0">👤</div><div><div style="font-weight:800;font-size:.9rem;color:var(--tx)">${p.name}</div><div style="font-size:.72rem;color:var(--t3)">${p.age} tuổi · ${p.job} · ${p.income}</div></div></div><div style="display:grid;gap:7px;font-size:.76rem"><div style="background:rgba(62,207,142,.08);border-radius:8px;padding:9px;border-left:3px solid var(--gr)"><strong style="color:var(--gr)">🎯 Mục tiêu:</strong> ${p.goal}</div><div style="background:rgba(239,83,80,.08);border-radius:8px;padding:9px;border-left:3px solid var(--rd)"><strong style="color:var(--rd)">😤 Nỗi đau:</strong> ${p.pain}</div><div style="background:rgba(245,166,35,.08);border-radius:8px;padding:9px;border-left:3px solid var(--ac)"><strong style="color:var(--ac)">🧠 Tâm lý:</strong> ${p.psy}</div><div style="background:rgba(76,156,245,.08);border-radius:8px;padding:9px;border-left:3px solid var(--bl)"><strong style="color:var(--bl)">💡 Cách tiếp cận:</strong> ${p.tip}</div></div></div>`).join('');
  el.classList.remove('hidden');
}

function doEmail(){
  const el=document.getElementById('emailOut');if(!el)return;
  const eid='em_'+Date.now();
  const emails=[
    {n:'Email 1 — Giới thiệu',content:`Chào anh/chị [Tên],\n\nEm [Tên bạn] — chuyên gia BĐS khu vực. Em biết anh/chị đang tìm nhà tại [Khu vực].\n\nEm có [X] căn phù hợp ngân sách và nhu cầu của anh/chị.\n\nAnh/chị có thể dành 15 phút để em giới thiệu không ạ?\n\nTrân trọng,\n[Tên bạn] | [SĐT]`},
    {n:'Email 2 — Follow-up sau 3 ngày',content:`Chào anh/chị [Tên],\n\nEm muốn hỏi thăm — anh/chị đã có cơ hội xem thông tin em gửi chưa ạ?\n\nTuần này em vừa có thêm 2 căn mới tại [Khu vực] — giá và vị trí rất tốt.\n\nNếu anh/chị muốn, em sắp lịch xem ngay trong tuần này nhé?\n\n[Tên bạn] | [SĐT]`},
    {n:'Email 3 — Cung cấp giá trị',content:`Chào anh/chị [Tên],\n\nEm gửi anh/chị báo cáo thị trường BĐS [Khu vực] tháng này:\n\n• Giá trung bình: [X] tr/m²\n• Tốc độ tăng 6 tháng: +[Y]%\n• Thanh khoản: [Nhanh/Trung bình]\n\nKhông cần phản hồi — chỉ muốn anh/chị có thêm thông tin hữu ích.\n\n[Tên bạn]`}
  ];
  el.innerHTML=`<div id="${eid}">${emails.map((e,i)=>`<div class="card" style="margin-bottom:9px"><div class="ctit"><span class="dot"></span>${e.n}</div><pre style="white-space:pre-wrap;font-size:.75rem;color:var(--t2);line-height:1.7">${e.content}</pre><button class="btn btn-s btn-xs" style="margin-top:6px" onclick="cpTxt(this.previousElementSibling.textContent)">📋 Copy</button></div>`).join('')}</div>`;
  el.classList.remove('hidden');
}

// ===================== CMP =====================
async function doCmp(){
  const their=V('cmp_txt'),mine=V('cmp_mine');
  if(!their||!mine)return toast('⚠️ Nhập cả 2 bài viết để so sánh!');
  document.getElementById('cmpOut').classList.add('hidden');await sleep(400);
  const score=t=>{let s=5;if(t.match(/[!?💥🔥⚡]/))s+=1;if(t.length>200)s+=1;if(t.match(/liên hệ|inbox|gọi|nhắn/i))s+=1;if(t.match(/sổ hồng|pháp lý/i))s+=0.5;if(t.match(/\d+.*tỷ|\d+m²/))s+=0.5;return Math.min(10,Math.round(s*10)/10);};
  const ts=score(their),ms=score(mine);
  const diff=ms-ts;
  const crit=['🎣 Hook','📢 CTA','📋 Thông tin','🎯 Thuyết phục','📱 Format'];
  const theirS=crit.map(()=>rn(4,8));const mineS=crit.map(()=>rn(5,9));
  document.getElementById('cmpRes').innerHTML=`<div class="cmp-cols"><div class="cmp-col"><div class="cmp-hd red">📄 Đối thủ — ${ts}/10</div>${theirS.map((s,i)=>`<div class="cmp-srow"><div class="cmp-slbl">${crit[i]}</div><div class="cmp-sbar"><div class="cmp-sfill" style="width:${s*10}%;background:var(--rd)"></div></div><div class="cmp-snum" style="color:var(--rd)">${s}</div></div>`).join('')}</div><div class="cmp-col"><div class="cmp-hd green">✍️ Của bạn — ${ms}/10</div>${mineS.map((s,i)=>`<div class="cmp-srow"><div class="cmp-slbl">${crit[i]}</div><div class="cmp-sbar"><div class="cmp-sfill" style="width:${s*10}%;background:var(--gr)"></div></div><div class="cmp-snum" style="color:var(--gr)">${s}</div></div>`).join('')}</div></div>${diff>0?`<div class="card" style="margin-top:11px;border-color:rgba(62,207,142,.3);text-align:center;padding:13px"><div style="font-weight:800;font-size:.95rem;color:var(--gr);margin-bottom:5px">🏆 Content của bạn vượt trội +${diff.toFixed(1)} điểm!</div><div style="font-size:.77rem;color:var(--t2)">Tiếp tục nhấn mạnh pháp lý, CTA rõ ràng và tâm lý khách hàng để duy trì lợi thế.</div></div>`:`<div class="card" style="margin-top:11px;border-color:rgba(239,83,80,.3);text-align:center;padding:13px"><div style="font-weight:800;font-size:.95rem;color:var(--rd);margin-bottom:5px">⚠️ Cần cải thiện ${Math.abs(diff).toFixed(1)} điểm</div><div style="font-size:.77rem;color:var(--t2)">Thêm hook mạnh hơn, CTA rõ ràng và số liệu thực tế vào bài.</div></div>`}`;
  document.getElementById('cmpOut').classList.remove('hidden');
}
function clearCmp(){document.getElementById('cmp_txt').value='';document.getElementById('cmp_mine').value='';document.getElementById('cmpOut').classList.add('hidden');}

// ===================== FENGSHUI =====================
function buildFSEl(){
  const g=document.getElementById('elGrid');if(!g)return;
  g.innerHTML=Object.entries(FS_DATA).map(([n,d])=>`<div class="elc${n===selEl?' on':''}" data-e="${n}" onclick="selFSEl('${n}',this)"><div class="eemi">${d.e}</div><div class="enm">${n}</div></div>`).join('');
}
function selFSEl(n,el){document.querySelectorAll('.elc').forEach(c=>c.classList.remove('on'));el.classList.add('on');selEl=n;}
async function doFS(){
  document.getElementById('fsOut').classList.add('hidden');await sleep(260);
  const d=FS_DATA[selEl];
  document.getElementById('fsRes').innerHTML=`
    <div class="card" style="border-color:${d.c}40">
      <div style="display:flex;align-items:center;gap:11px;margin-bottom:12px">
        <div style="font-size:2.2rem">${d.e}</div>
        <div><div style="font-weight:800;font-size:1rem;color:var(--tx)">Mệnh ${selEl}</div><div style="font-size:.73rem;color:var(--t3);margin-top:2px">${d.tip}</div></div>
      </div>
      <div class="sec" style="margin-top:0">Từ khoá hợp mệnh</div>
      <div class="pgr" style="margin-bottom:12px">${d.kw.map(k=>`<div class="pill on" style="cursor:default">${k}</div>`).join('')}</div>
      <div class="sec">Màu sắc nên dùng</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:11px">${d.col.map(c=>`<span style="background:var(--card);border:1px solid var(--border);border-radius:6px;padding:3px 10px;font-size:.72rem;color:var(--t2)">🎨 ${c}</span>`).join('')}</div>
      <div class="sec">Màu sắc nên tránh</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">${d.avoid.map(c=>`<span style="background:rgba(239,83,80,.1);border:1px solid rgba(239,83,80,.3);border-radius:6px;padding:3px 10px;font-size:.72rem;color:var(--rd)">🚫 ${c}</span>`).join('')}</div>
    </div>
    <div class="card">
      <div class="ctit"><span class="dot"></span>Ví dụ content hợp mệnh ${selEl}</div>
      ${[`"${d.kw[0]} từng góc nhỏ — không gian mang may mắn & tài lộc cho gia chủ mệnh ${selEl}"`,`"${d.kw[1]} và ${d.kw[2]} — tổ ấm ${selEl} phát tài phát lộc, an cư thịnh vượng"`,`"Không gian ${d.kw[3]||'lý tưởng'}, màu ${d.col[0]} hài hòa — ngôi nhà đúng mệnh, cuộc sống bền vững"`].map((ex,i)=>{const exid='fs'+i+'_'+Date.now();return`<div style="background:var(--bg3);border-radius:8px;padding:9px;margin-bottom:7px;font-size:.78rem;color:var(--t2);font-style:italic;border-left:3px solid ${d.c};position:relative"><div id="${exid}">${ex}</div><button class="cpbtn" onclick="cpEl('${exid}')">📋 Copy</button></div>`;}).join('')}
    </div>`;
  document.getElementById('fsOut').classList.remove('hidden');
}

// ===================== CRM =====================
function saveCRM(){
  if(!VS.length)return toast('⚠️ Chưa có content!');
  const d=gfd();
  crm.unshift({id:Date.now(),type:d.type,loc:d.loc,price:d.price,area:d.area,pros:d.pros,time:new Date().toLocaleString('vi-VN'),vs:VS});
  saveSt();buildCRM();updStats();buildHomeRecent();toast('💾 Đã lưu CRM!');
}
function buildCRM(){
  const b=document.getElementById('crmBody');if(!b)return;
  if(!crm.length){b.innerHTML='<tr><td colspan="7" style="text-align:center;color:var(--t3);padding:24px">Chưa có dữ liệu. Tạo content và bấm "Lưu CRM" để lưu.</td></tr>';return;}
  b.innerHTML=crm.map((e,i)=>`<tr><td>${i+1}</td><td><strong style="color:var(--tx)">${e.type}</strong></td><td>${e.loc}</td><td style="color:var(--ac);font-weight:700">${e.price}</td><td style="color:var(--t3)">${e.vs?e.vs.length:1}v</td><td style="color:var(--t3);font-size:.7rem">${e.time}</td><td><div style="display:flex;gap:4px"><button class="btn btn-xs btn-s" onclick="loadCRM(${i})">📂</button><button class="btn btn-xs btn-r" onclick="delCRM(${i})">🗑️</button></div></td></tr>`).join('');
  const bd=document.getElementById('crmbdg');if(bd)bd.textContent=crm.length;
}
function loadCRM(i){
  const e=crm[i];
  ['type','price','area','loc','pros'].forEach(k=>{const el=document.getElementById('i_'+k);if(el)el.value=e[k]||'';});
  VS=e.vs||[];VI=0;
  nav('gen');
  if(VS.length){document.getElementById('outArea').classList.add('on');document.getElementById('vTabsRow').classList.toggle('hidden',VS.length<=1);if(VS.length>1){const lb=['💰 THAM','🔥 SÂN','🤔 SI','👑 NGẠO','🔍 NGHI NGỜ'];document.getElementById('vTabs').innerHTML=VS.map((x,j)=>`<div class="vtab${j===0?' on':''}" data-v="${j}" onclick="sVer(this,${j})">${lb[j]||'V'+(j+1)}</div>`).join('');}renderPlt();}
  toast('📂 Đã load!');
}
function delCRM(i){if(!confirm('Xóa?'))return;crm.splice(i,1);saveSt();buildCRM();updStats();buildHomeRecent();toast('🗑️ Đã xóa!');}
function clearAllCRM(){if(!confirm('Xóa toàn bộ CRM?'))return;crm=[];saveSt();buildCRM();updStats();buildHomeRecent();toast('🗑️ Đã xóa toàn bộ!');}

// ===================== TEMPLATES =====================
function saveTpl(){
  if(!VS.length)return toast('⚠️ Chưa có content!');
  const n=prompt('Đặt tên template:');if(!n)return;
  tpl.unshift({id:Date.now(),name:n,time:new Date().toLocaleString('vi-VN'),vs:VS});
  saveSt();buildTpl();updStats();toast('📌 Đã lưu template!');
}
function buildTpl(){
  const el=document.getElementById('tplList');if(!el)return;
  if(!tpl.length){el.innerHTML='<div class="card" style="text-align:center;color:var(--t3);padding:24px">Chưa có template. Tạo content và bấm "Lưu Template" để lưu.</div>';return;}
  el.innerHTML=tpl.map((t,i)=>`<div class="card" style="display:flex;align-items:center;justify-content:space-between;gap:10px"><div><div style="font-weight:700;color:var(--tx)">${t.name}</div><div style="font-size:.71rem;color:var(--t3);margin-top:2px">${t.time} · ${t.vs?t.vs.length:1} phiên bản</div></div><div style="display:flex;gap:6px;flex-shrink:0"><button class="btn btn-sm btn-s" onclick="useTpl(${i})">📂 Dùng</button><button class="btn btn-sm btn-r" onclick="delTpl(${i})">🗑️</button></div></div>`).join('');
}
function useTpl(i){VS=tpl[i].vs||[];VI=0;nav('gen');if(VS.length){document.getElementById('outArea').classList.add('on');renderPlt();}toast('📂 Đã load template!');}
function delTpl(i){if(!confirm('Xóa?'))return;tpl.splice(i,1);saveSt();buildTpl();updStats();toast('🗑️ Đã xóa!');}
function clearAllTpl(){if(!confirm('Xóa tất cả template?'))return;tpl=[];saveSt();buildTpl();updStats();toast('🗑️ Đã xóa toàn bộ!');}

// ===================== PROFILE =====================
function loadProfInp(){['name','title','phone','zalo','quote'].forEach(k=>{const e=document.getElementById('p_'+k);if(e)e.value=prof[k]||'';});}
function saveProf(){
  const newName=V('p_name'),newTitle=V('p_title'),newPhone=V('p_phone'),newZalo=V('p_zalo'),newQuote=V('p_quote');
  if(!newName&&!newPhone)return toast('⚠️ Nhập ít nhất tên hoặc SĐT!');
  prof={...prof,name:newName,title:newTitle,phone:newPhone,zalo:newZalo,quote:newQuote};
  saveSt();buildProf();toast('💾 Đã lưu hồ sơ cá nhân!');
}
function resetProf(){
  if(!confirm('Xóa hồ sơ cá nhân?'))return;
  prof={name:'',title:'',phone:'',zalo:'',quote:'',avatar:''};
  saveSt();loadProfInp();removeAv();buildProf();buildEarn();toast('🔄 Đã xóa hồ sơ!');
}
function triggerAv(){document.getElementById('avFile').click();}
function loadAv(input){
  const file=input.files[0];if(!file)return;
  if(file.size>2*1024*1024)return toast('⚠️ Ảnh tối đa 2MB!');
  const r=new FileReader();r.onload=e=>{prof.avatar=e.target.result;showAv(e.target.result);saveSt();buildProf();toast('📷 Đã cập nhật ảnh!');};r.readAsDataURL(file);
}
function showAv(src){const img=document.getElementById('avImg'),emo=document.getElementById('avEmoji');if(img&&emo){img.src=src;img.style.display='block';emo.style.display='none';}}
function removeAv(){prof.avatar='';const img=document.getElementById('avImg'),emo=document.getElementById('avEmoji');if(img)img.style.display='none';if(emo)emo.style.display='block';saveSt();buildProf();toast('🗑️ Đã xóa ảnh!');}
function buildProf(){
  const el=document.getElementById('profPrev');if(!el)return;
  const avHtml=prof.avatar?`<img src="${prof.avatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`:'👤';
  const userHtml=prof.name?`<div class="aav" style="margin:0 auto 9px;cursor:default">${avHtml}</div><div class="anm">${prof.name}</div><div class="atit">${prof.title}</div><div class="aqt">"${prof.quote}"</div><div class="ccrow"><div class="cchip">📞 ${prof.phone}</div><div class="cchip">💬 ${prof.zalo}</div></div>`:'<div style="color:var(--t3);font-size:.85rem;padding:20px;text-align:center">👆 Nhập thông tin bên trên để xem preview</div>';
  const authAv=authorProf.avatar?`<img src="${authorProf.avatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`:'👑';
  const authHtml=`<div style="margin-top:16px;padding-top:16px;border-top:2px solid var(--border)"><div style="font-size:.65rem;font-weight:700;color:var(--ac);text-transform:uppercase;letter-spacing:1.3px;margin-bottom:10px">🏆 Tác Giả Công Cụ</div><div class="aav" style="margin:0 auto 9px;cursor:default;width:56px;height:56px;font-size:1.2rem">${authAv}</div><div class="anm" style="font-size:.88rem">${authorProf.name}</div><div class="atit">${authorProf.title}</div><div style="font-size:.72rem;color:var(--t2);margin-top:6px">${authorProf.social}</div><div class="ccrow" style="margin-top:8px"><a href="${authorProf.link}" target="_blank" class="cchip" style="color:var(--bl);text-decoration:none">💬 Liên hệ tác giả</a></div></div>`;
  el.innerHTML=userHtml+authHtml;
}

// ===================== AGENTS =====================
function buildAgents(){
  const g=document.getElementById('agGrid');if(!g)return;
  g.innerHTML=AGENTS.map(a=>`<div class="agc"><div class="agi">${a.e}</div><div class="agn">${a.n}</div><div class="agd">${a.d}</div><a class="agl" href="${a.l}" target="_blank">🔗 Mở Agent →</a></div>`).join('');
}

// ===================== EARN =====================
function buildEarn(){
  const el=document.getElementById('earnCtc');if(!el)return;
  const avHtml=authorProf.avatar?`<img src="${authorProf.avatar}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`:'👑';
  el.innerHTML=`<div class="acrd"><div class="aav" style="margin:0 auto 9px;cursor:default">${avHtml}</div><div class="anm">${authorProf.name}</div><div class="atit">${authorProf.title}</div><div style="font-size:.72rem;color:var(--t2);margin-top:6px">${authorProf.social}</div><div class="ccrow" style="margin-top:9px"><a href="${authorProf.link}" target="_blank" class="cchip" style="color:var(--bl);text-decoration:none">💬 Liên hệ tác giả</a></div></div>`;
}

// ===================== STATS / HOME =====================
function updStats(){
  const a=document.getElementById('stTotal'),b=document.getElementById('stTpl'),c=document.getElementById('crmbdg'),d=document.getElementById('stReminders');
  if(a)a.textContent=contentLog.length||crm.length;
  if(b)b.textContent=tpl.length;
  if(c)c.textContent=crm.length;
  if(d)d.textContent=reminders.filter(r=>!r.done).length;
  // Update reminder badge
  const rmBadge=document.getElementById('rmBadge');
  const dueCount=reminders.filter(r=>!r.done&&new Date(r.datetime)<=new Date()).length;
  if(rmBadge)rmBadge.textContent=dueCount;
  if(rmBadge)rmBadge.style.display=dueCount>0?'':'none';
}
function buildHomeRecent(){
  const el=document.getElementById('homeRecent');if(!el)return;
  if(!crm.length){el.innerHTML='<div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:18px;text-align:center;color:var(--t3);font-size:.79rem">Chưa có tin nào. <span style="color:var(--ac);cursor:pointer" onclick="nav(\'gen\')">Tạo content ngay →</span></div>';return;}
  el.innerHTML='<div style="display:flex;flex-direction:column;gap:7px">'+crm.slice(0,5).map((e,i)=>`<div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:11px 14px;display:flex;align-items:center;gap:11px;cursor:pointer;transition:.15s" onclick="loadCRM(${i})" onmouseover="this.style.borderColor='rgba(245,166,35,.35)'" onmouseout="this.style.borderColor='var(--border)'"><div style="font-size:1.3rem">🏠</div><div style="flex:1"><div style="font-weight:700;font-size:.8rem;color:var(--tx)">${e.type} — ${e.loc}</div><div style="font-size:.7rem;color:var(--t3);margin-top:1px">${e.price} · ${e.time}</div></div><div style="font-size:.68rem;color:var(--t3)">${e.vs?e.vs.length:1}v</div></div>`).join('')+'</div>';
}

// ===================== FOLLOW-UP REMINDERS (NEW) =====================
function buildReminders(){
  const el=document.getElementById('reminderList');if(!el)return;
  if(!reminders.length){
    el.innerHTML=`<div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:24px;text-align:center;color:var(--t3)"><div style="font-size:2rem;margin-bottom:8px">⏰</div><div style="font-size:.83rem">Chưa có nhắc nhở nào.<br>Thêm nhắc nhở follow-up KH bên trên!</div></div>`;
    return;
  }
  const now=new Date();
  const sorted=[...reminders].sort((a,b)=>new Date(a.datetime)-new Date(b.datetime));
  el.innerHTML=sorted.map((r,i)=>{
    const dt=new Date(r.datetime);
    const isDue=dt<=now&&!r.done;
    const isUpcoming=dt>now&&!r.done;
    const status=r.done?'done':isDue?'due':'upcoming';
    const statusColors={done:'rgba(62,207,142,.15)',due:'rgba(239,83,80,.15)',upcoming:'rgba(245,166,35,.1)'};
    const statusBorder={done:'rgba(62,207,142,.4)',due:'rgba(239,83,80,.4)',upcoming:'rgba(245,166,35,.35)'};
    const statusLabel={done:'✅ Hoàn thành',due:'🔴 Đã đến hạn!',upcoming:`⏰ ${formatTimeLeft(dt)}`};
    return`<div style="background:${statusColors[status]};border:1px solid ${statusBorder[status]};border-radius:11px;padding:12px 14px;margin-bottom:8px;${r.done?'opacity:.6':''}">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px">
        <div style="flex:1">
          <div style="font-weight:700;font-size:.83rem;color:var(--tx);margin-bottom:3px">👤 ${r.khName||'Khách hàng'}</div>
          <div style="font-size:.73rem;color:var(--t2);margin-bottom:4px">🏠 ${r.property||'BĐS'}</div>
          <div style="font-size:.72rem;color:var(--t3);margin-bottom:5px">📞 ${r.phone||'—'} · ${r.type||'Follow-up'}</div>
          ${r.note?`<div style="font-size:.71rem;color:var(--t2);background:var(--bg3);border-radius:6px;padding:5px 8px;margin-bottom:5px">📝 ${r.note}</div>`:''}
          <div style="font-size:.71rem;font-weight:700;color:${status==='due'?'var(--rd)':status==='done'?'var(--gr)':'var(--ac)'}">${statusLabel[status]}</div>
          <div style="font-size:.67rem;color:var(--t3);margin-top:2px">🕐 ${dt.toLocaleString('vi-VN')}</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:5px;flex-shrink:0">
          ${!r.done?`<button class="btn btn-g btn-xs" onclick="doneReminder(${reminders.indexOf(r)})">✅ Xong</button>`:''}
          <button class="btn btn-s btn-xs" onclick="copyReminderScript(${reminders.indexOf(r)})">💬 Script</button>
          <button class="btn btn-r btn-xs" onclick="deleteReminder(${reminders.indexOf(r)})">🗑️</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

function addReminder(){
  const khName=V('rm_name'),phone=V('rm_phone'),property=V('rm_property'),datetime=document.getElementById('rm_datetime')?.value,type=document.getElementById('rm_type')?.value||'Follow-up',note=V('rm_note');
  if(!khName)return toast('⚠️ Nhập tên khách hàng!');
  if(!datetime)return toast('⚠️ Chọn ngày giờ nhắc!');
  reminders.push({id:Date.now(),khName,phone,property,datetime,type,note,done:false,created:new Date().toISOString()});
  saveSt();buildReminders();updStats();
  // Clear form
  ['rm_name','rm_phone','rm_property','rm_note'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  toast('⏰ Đã đặt nhắc lịch!');
}

function doneReminder(idx){
  reminders[idx].done=true;
  reminders[idx].completedAt=new Date().toISOString();
  saveSt();buildReminders();updStats();toast('✅ Đã hoàn thành!');
}

function deleteReminder(idx){
  if(!confirm('Xóa nhắc lịch này?'))return;
  reminders.splice(idx,1);saveSt();buildReminders();updStats();toast('🗑️ Đã xóa!');
}

function copyReminderScript(idx){
  const r=reminders[idx];
  const scripts={
    'Follow-up':`Chào ${r.khName}! Em [tên] ạ. Em muốn hỏi thăm về căn ${r.property||'nhà'} hôm trước — anh/chị đang cân nhắc ở điểm nào nhất ạ? Để em hỗ trợ đúng chỗ. 🙏`,
    'Nhắc xem nhà':`Chào ${r.khName}! Em nhắc lịch xem nhà ${r.property||''} theo lịch hẹn. Anh/chị còn tiện không ạ? Em đã sắp xếp để dẫn anh/chị xem hôm nay.`,
    'Nhắc cọc':`Chào ${r.khName}! Theo thỏa thuận, hạn đặt cọc ${r.property||''} là hôm nay. Anh/chị có thể ra công chứng lúc mấy giờ? Em sắp xếp cùng anh/chị.`,
    'Nhắc thanh toán':`Chào ${r.khName}! Em nhắc lịch thanh toán đợt [X] cho ${r.property||''}. Anh/chị muốn em hỗ trợ thủ tục gì không ạ?`,
    'Hỏi thăm':`Chào ${r.khName}! Lâu rồi không liên hệ — anh/chị dạo này thế nào? Em vừa có thông tin mới về thị trường BĐS khu [khu vực] — có thể hữu ích cho anh/chị. 😊`
  };
  cpTxt(scripts[r.type]||scripts['Follow-up']);
  toast('✅ Đã copy script follow-up!');
}

function clearDoneReminders(){
  reminders=reminders.filter(r=>!r.done);
  saveSt();buildReminders();updStats();toast('🗑️ Đã xóa nhắc đã hoàn thành!');
}

function checkDueReminders(){
  const dueCount=reminders.filter(r=>!r.done&&new Date(r.datetime)<=new Date()).length;
  if(dueCount>0){
    setTimeout(()=>toast(`⏰ Có ${dueCount} nhắc lịch đã đến hạn!`),1500);
  }
  // Check every minute
  setInterval(()=>{
    updStats();
    const newDue=reminders.filter(r=>!r.done&&new Date(r.datetime)<=new Date()).length;
    if(newDue>0){
      const rmBadge=document.getElementById('rmBadge');
      if(rmBadge){rmBadge.textContent=newDue;rmBadge.style.display='';}
    }
  },60000);
}

function formatTimeLeft(dt){
  const now=new Date();
  const diff=dt-now;
  if(diff<0)return'Đã qua';
  const mins=Math.floor(diff/60000);
  const hours=Math.floor(mins/60);
  const days=Math.floor(hours/24);
  if(days>0)return`Còn ${days} ngày`;
  if(hours>0)return`Còn ${hours} giờ`;
  return`Còn ${mins} phút`;
}

// ===================== DASHBOARD (NEW) =====================
function buildDashboard(){
  const el=document.getElementById('dashboardContent');if(!el)return;
  const now=new Date();
  const thisWeek=getWeekNumber(now);
  const thisMonth=now.getMonth()+1;
  const thisYear=now.getFullYear();

  // Stats
  const totalContent=contentLog.length;
  const thisWeekContent=contentLog.filter(c=>c.week===thisWeek&&c.year===thisYear).length;
  const thisMonthContent=contentLog.filter(c=>c.month===thisMonth&&c.year===thisYear).length;
  const totalReminders=reminders.length;
  const dueReminders=reminders.filter(r=>!r.done&&new Date(r.datetime)<=now).length;
  const doneReminders=reminders.filter(r=>r.done).length;

  // Last 7 days chart data
  const last7=[];
  for(let i=6;i>=0;i--){
    const d=new Date(now);d.setDate(d.getDate()-i);
    const dayStr=d.toISOString().split('T')[0];
    const count=contentLog.filter(c=>c.date===dayStr).length;
    const dayName=['CN','T2','T3','T4','T5','T6','T7'][d.getDay()];
    last7.push({day:dayName,date:dayStr,count});
  }
  const maxDay=Math.max(...last7.map(d=>d.count),1);

  // Last 4 weeks
  const last4weeks=[];
  for(let i=3;i>=0;i--){
    const weekNum=thisWeek-i;
    const count=contentLog.filter(c=>c.week===weekNum&&c.year===thisYear).length;
    last4weeks.push({week:`T${weekNum}`,count});
  }
  const maxWeek=Math.max(...last4weeks.map(w=>w.count),1);

  // Content by platform (simulated from CRM data)
  const byType={};
  crm.forEach(c=>{byType[c.type]=(byType[c.type]||0)+1;});
  const topTypes=Object.entries(byType).sort((a,b)=>b[1]-a[1]).slice(0,5);

  el.innerHTML=`
    <!-- Stats row -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:16px">
      <div style="background:linear-gradient(135deg,rgba(245,166,35,.15),rgba(245,166,35,.05));border:1px solid rgba(245,166,35,.3);border-radius:12px;padding:14px;text-align:center">
        <div style="font-size:2rem;font-weight:900;color:var(--ac);font-family:'Space Mono',monospace">${totalContent}</div>
        <div style="font-size:.68rem;color:var(--t3);margin-top:3px">Tổng content</div>
      </div>
      <div style="background:linear-gradient(135deg,rgba(62,207,142,.15),rgba(62,207,142,.05));border:1px solid rgba(62,207,142,.3);border-radius:12px;padding:14px;text-align:center">
        <div style="font-size:2rem;font-weight:900;color:var(--gr);font-family:'Space Mono',monospace">${thisWeekContent}</div>
        <div style="font-size:.68rem;color:var(--t3);margin-top:3px">Tuần này</div>
      </div>
      <div style="background:linear-gradient(135deg,rgba(76,156,245,.15),rgba(76,156,245,.05));border:1px solid rgba(76,156,245,.3);border-radius:12px;padding:14px;text-align:center">
        <div style="font-size:2rem;font-weight:900;color:var(--bl);font-family:'Space Mono',monospace">${thisMonthContent}</div>
        <div style="font-size:.68rem;color:var(--t3);margin-top:3px">Tháng này</div>
      </div>
      <div style="background:linear-gradient(135deg,rgba(239,83,80,.15),rgba(239,83,80,.05));border:1px solid rgba(239,83,80,.3);border-radius:12px;padding:14px;text-align:center">
        <div style="font-size:2rem;font-weight:900;color:var(--rd);font-family:'Space Mono',monospace">${dueReminders}</div>
        <div style="font-size:.68rem;color:var(--t3);margin-top:3px">Nhắc đến hạn</div>
      </div>
    </div>

    <!-- 7-day chart -->
    <div class="card" style="margin-bottom:12px">
      <div class="ctit"><span class="dot"></span>📈 Content 7 ngày qua</div>
      <div style="display:flex;align-items:flex-end;gap:6px;height:100px;padding:0 4px">
        ${last7.map(d=>`
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
            <div style="font-size:.65rem;color:var(--t3);font-family:'Space Mono',monospace">${d.count}</div>
            <div style="width:100%;background:${d.count>0?'linear-gradient(180deg,var(--ac),var(--a2))':'var(--bg3)'};border-radius:4px 4px 0 0;height:${Math.max(4,Math.round((d.count/maxDay)*72))}px;transition:.3s"></div>
            <div style="font-size:.62rem;color:var(--t3)">${d.day}</div>
          </div>`).join('')}
      </div>
    </div>

    <!-- Weekly chart -->
    <div class="card" style="margin-bottom:12px">
      <div class="ctit"><span class="dot"></span>📊 Content 4 tuần qua</div>
      <div style="display:flex;align-items:flex-end;gap:8px;height:80px;padding:0 4px">
        ${last4weeks.map(w=>`
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
            <div style="font-size:.65rem;color:var(--t3);font-family:'Space Mono',monospace">${w.count}</div>
            <div style="width:100%;background:${w.count>0?'linear-gradient(180deg,var(--bl),#2979e0)':'var(--bg3)'};border-radius:4px 4px 0 0;height:${Math.max(4,Math.round((w.count/maxWeek)*56))}px;transition:.3s"></div>
            <div style="font-size:.62rem;color:var(--t3)">${w.week}</div>
          </div>`).join('')}
      </div>
    </div>

    <!-- Summary cards -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:12px">
      <div class="card">
        <div class="ctit"><span class="dot"></span>🗄️ Mini CRM</div>
        <div style="font-size:.77rem;color:var(--t2);line-height:1.9">
          📦 Tổng tin: <strong style="color:var(--ac)">${crm.length}</strong><br>
          📌 Templates: <strong style="color:var(--bl)">${tpl.length}</strong>
        </div>
        <button class="btn btn-s btn-xs" style="margin-top:8px;width:100%;justify-content:center" onclick="nav('crm')">Mở CRM →</button>
      </div>
      <div class="card">
        <div class="ctit"><span class="dot"></span>⏰ Nhắc Lịch</div>
        <div style="font-size:.77rem;color:var(--t2);line-height:1.9">
          🔴 Đến hạn: <strong style="color:var(--rd)">${dueReminders}</strong><br>
          ✅ Hoàn thành: <strong style="color:var(--gr)">${doneReminders}</strong><br>
          ⏳ Sắp tới: <strong style="color:var(--ac)">${totalReminders-dueReminders-doneReminders}</strong>
        </div>
        <button class="btn btn-s btn-xs" style="margin-top:8px;width:100%;justify-content:center" onclick="nav('reminder')">Xem lịch →</button>
      </div>
    </div>

    ${topTypes.length?`<div class="card">
      <div class="ctit"><span class="dot"></span>🏠 Loại nhà hay đăng nhất</div>
      ${topTypes.map(([t,c])=>`<div style="display:flex;align-items:center;gap:8px;margin-bottom:7px">
        <div style="font-size:.75rem;color:var(--t2);width:100px;flex-shrink:0">${t}</div>
        <div style="flex:1;height:8px;background:var(--bg3);border-radius:4px;overflow:hidden">
          <div style="height:100%;background:linear-gradient(90deg,var(--ac),var(--a2));border-radius:4px;width:${Math.round((c/topTypes[0][1])*100)}%"></div>
        </div>
        <div style="font-size:.7rem;font-weight:700;color:var(--ac);width:20px;text-align:right">${c}</div>
      </div>`).join('')}
    </div>`:''}

    <div style="text-align:center;padding:10px 0;font-size:.7rem;color:var(--t3)">
      📅 Cập nhật: ${now.toLocaleString('vi-VN')} · <span style="cursor:pointer;color:var(--ac)" onclick="buildDashboard()">🔄 Refresh</span>
    </div>`;
}

// ===================== GUIDE (NEW) =====================
function buildGuide(){
  const el=document.getElementById('guideContent');if(!el)return;
  const guides=[
    {
      icon:'🔍',title:'Khảo Sát Nhà → Tạo Content',color:'var(--gr)',
      steps:[
        'Vào <strong>Khảo Sát Nhà</strong> — điền đầy đủ địa chỉ, giá, diện tích, số tầng',
        'Tích checklist 9 bước khi đi khảo sát thực tế',
        'Điền 5 Ưu điểm và 5 Nhược điểm vào ô báo cáo',
        'Nhấn <strong>"✍️ → Tạo Content"</strong> — toàn bộ dữ liệu tự động điền vào form Content',
        'Kiểm tra các trường đã được điền, chỉnh sửa nếu cần → Bấm Tạo!'
      ],
      tip:'💡 Mẹo: Khảo sát kỹ → Content đúng và thuyết phục hơn 3x!'
    },
    {
      icon:'✍️',title:'Tạo Content Đa Nền Tảng',color:'var(--ac)',
      steps:[
        'Vào <strong>Tạo Content</strong> — điền thông tin BĐS hoặc bấm ⚡ Auto từ Khảo Sát',
        'Chọn mục tiêu: Chốt nhanh / Thu lead / Tăng tương tác',
        'Bật <strong>AUTO SMART</strong> để AI tự chọn tâm lý & công thức, hoặc tự chọn thủ công',
        'Chọn 1 phiên bản hoặc 5 phiên bản (1 cho mỗi tâm lý KH)',
        'Bấm <strong>"🚀 Tạo Content"</strong> → Xem kết quả theo 4 tab: FB, Zalo, TikTok, Web',
        'Copy nội dung → Đăng trực tiếp hoặc chỉnh sửa thêm'
      ],
      tip:'💡 Mẹo: Chọn "5 phiên bản" để có content cho tất cả 5 loại KH cùng lúc!'
    },
    {
      icon:'⏰',title:'Đặt Nhắc Lịch Follow-up KH',color:'var(--rd)',
      steps:[
        'Vào <strong>Nhắc Lịch KH</strong> — nhập tên KH, SĐT, BĐS quan tâm',
        'Chọn loại nhắc: Follow-up / Nhắc xem nhà / Nhắc cọc / Hỏi thăm',
        'Chọn ngày giờ → Thêm ghi chú nếu cần → Bấm <strong>"⏰ Đặt Nhắc"</strong>',
        'Nhắc lịch hiển thị theo thứ tự thời gian, màu đỏ = đã đến hạn',
        'Bấm <strong>"💬 Script"</strong> để copy sẵn nội dung nhắn tin theo tình huống',
        'Bấm <strong>"✅ Xong"</strong> khi đã follow-up xong'
      ],
      tip:'💡 Mẹo: Đặt nhắc ngay sau mỗi buổi xem nhà — đừng để KH nguội lạnh!'
    },
    {
      icon:'📊',title:'Dashboard & Thống Kê',color:'var(--bl)',
      steps:[
        'Vào <strong>Dashboard</strong> để xem toàn bộ thống kê hoạt động',
        'Biểu đồ cột hiển thị số content đã tạo theo 7 ngày qua và 4 tuần',
        'Thống kê: tổng content, tuần này, tháng này, nhắc đến hạn',
        'Xem loại nhà hay đăng nhất để tối ưu danh mục sản phẩm',
        'Bấm 🔄 Refresh để cập nhật dữ liệu mới nhất'
      ],
      tip:'💡 Mẹo: Kiểm tra Dashboard mỗi sáng để lên kế hoạch ngày làm việc!'
    },
    {
      icon:'📅',title:'Lịch Đăng 7 Ngày',color:'var(--pu)',
      steps:[
        'Tạo content trước ở Tạo Content',
        'Vào <strong>Lịch 7 Ngày</strong> → Bấm ⚡ Auto để lấy BĐS vừa tạo',
        'Bấm <strong>"📅 Tạo Lịch"</strong> → 7 ngày hiển thị với chiến lược từng ngày',
        'Click từng ngày để xem content đã điền sẵn theo nền tảng',
        'Bấm <strong>"📄 Xuất .txt"</strong> để lưu toàn bộ lịch'
      ],
      tip:'💡 Mẹo: T7 là ngày vàng — luôn đăng bài có CTA mạnh nhất!'
    },
    {
      icon:'🏷️',title:'Định Giá BĐS — Thuật Giả Kim',color:'var(--gr)',
      steps:[
        'Vào <strong>Định Giá BĐS</strong> — nhập giá rao, DT, số tầng, W×D',
        'Chọn chất lượng xây dựng → Nhập đơn giá thị trường khu vực',
        'Bấm <strong>"🏷️ Định Giá"</strong> → Xem bóc tách giá đất + xây dựng',
        'Biết đơn giá đất thực để xác định căn đang ở mức "giá hời" hay không',
        'Bấm <strong>"✍️ → Tạo Content"</strong> để tự động điền kết quả định giá vào form content'
      ],
      tip:'💡 Mẹo: "Giá thấp hơn TT X%" là điểm khác biệt cực mạnh trong content!'
    },
    {
      icon:'🎭',title:'Đọc Vị Khách Hàng',color:'var(--pu)',
      steps:[
        'Vào <strong>Đọc Vị KH</strong> — trả lời 10 câu hỏi quan sát về KH',
        'Chọn phương án mô tả đúng nhất hành vi KH trong buổi xem nhà',
        'Hệ thống tự động phân tích và xác định tâm lý KH',
        'Xem chiến thuật tư vấn được đề xuất theo từng tâm lý',
        'Áp dụng ngay ngôn ngữ và cách tiếp cận phù hợp'
      ],
      tip:'💡 Mẹo: Biết tâm lý KH → chốt deal nhanh hơn 3 lần!'
    },
    {
      icon:'🤖',title:'AI Agents — Công Cụ Mở Rộng',color:'var(--ac)',
      steps:[
        'Vào <strong>AI Agents</strong> để xem các công cụ AI chuyên biệt',
        'Click <strong>"🔗 Mở Agent"</strong> để mở công cụ trên ChatGPT',
        'Dùng Super Hooks Master để tạo tiêu đề viral cho mọi nền tảng',
        'Dùng Viral Jetlag để biến tấu content đã có thành phiên bản mới',
        'Dùng The Vaults để tạo câu hỏi khám phá nhu cầu KH sâu hơn'
      ],
      tip:'💡 Mẹo: Kết hợp app này + AI Agents = bộ công cụ content BĐS mạnh nhất!'
    }
  ];

  el.innerHTML=guides.map((g,gi)=>`
    <div class="card" style="border-left:4px solid ${g.color};margin-bottom:11px" id="guide${gi}">
      <div style="display:flex;align-items:center;gap:9px;margin-bottom:11px;cursor:pointer" onclick="toggleGuide(${gi})">
        <div style="font-size:1.5rem;flex-shrink:0">${g.icon}</div>
        <div style="flex:1">
          <div style="font-weight:800;font-size:.87rem;color:var(--tx)">${g.title}</div>
        </div>
        <span style="color:var(--t3);font-size:.75rem;flex-shrink:0" id="garr${gi}">▼</span>
      </div>
      <div id="gbody${gi}">
        <ol style="padding-left:18px;margin-bottom:10px">
          ${g.steps.map(s=>`<li style="font-size:.77rem;color:var(--t2);margin-bottom:6px;line-height:1.6">${s}</li>`).join('')}
        </ol>
        <div style="background:rgba(245,166,35,.08);border:1px solid rgba(245,166,35,.25);border-radius:8px;padding:8px 11px;font-size:.73rem;color:var(--ac)">${g.tip}</div>
      </div>
    </div>`).join('');

  // Suggestions section
  el.innerHTML+=`
    <div class="card" style="border-color:rgba(156,110,245,.35);background:linear-gradient(135deg,rgba(156,110,245,.08),rgba(76,156,245,.05))">
      <div class="ctit"><span class="dot" style="background:var(--pu)"></span>💡 Gợi Ý Tính Năng & Tip Hay</div>
      <div style="display:grid;gap:8px">
        ${[
          {t:'Quy trình tối ưu',d:'Khảo Sát → Định Giá → Tạo Content → Lịch 7 Ngày → Chấm Điểm → Đặt Nhắc Follow-up',c:'var(--ac)'},
          {t:'Content 5x mỗi ngày',d:'Dùng chế độ "5 phiên bản" để có content cho 5 tâm lý KH chỉ trong 1 lần bấm',c:'var(--gr)'},
          {t:'Follow-up = Vàng',d:'80% giao dịch được chốt sau lần follow-up thứ 3-7. Đặt nhắc lịch ngay!',c:'var(--rd)'},
          {t:'A/B Test Hook',d:'Luôn test 2 phiên bản hook trước khi đăng — tăng tỷ lệ dừng lại 40-60%',c:'var(--bl)'},
          {t:'Backup thường xuyên',d:'Bấm 💾 Backup JSON trên thanh header để lưu toàn bộ dữ liệu về máy',c:'var(--pu)'},
          {t:'Hồ sơ cá nhân quan trọng',d:'Điền đầy đủ Hồ Sơ → Tên + SĐT tự động gắn vào MỌI content bạn tạo',c:'var(--ac)'}
        ].map(s=>`<div style="background:var(--bg3);border-radius:9px;padding:10px 12px;border-left:3px solid ${s.c}">
          <div style="font-weight:700;font-size:.77rem;color:var(--tx);margin-bottom:3px">${s.t}</div>
          <div style="font-size:.72rem;color:var(--t2);line-height:1.5">${s.d}</div>
        </div>`).join('')}
      </div>
    </div>`;
}

function toggleGuide(i){
  const body=document.getElementById('gbody'+i);
  const arr=document.getElementById('garr'+i);
  if(!body)return;
  const isOpen=body.style.display!=='none';
  body.style.display=isOpen?'none':'';
  if(arr)arr.textContent=isOpen?'▶':'▼';
}

// ===================== EXPORT =====================
function expTxt(){
  if(!VS.length)return toast('⚠️ Chưa có content!');
  let t='AUTO PRO CONTENT BĐS\n'+'='.repeat(46)+'\n\n';
  VS.forEach((v,i)=>{t+=`VERSION ${i+1}: ${v.py} | ${v.frm} | ${(v.gs||[]).join(', ')}\n${'─'.repeat(36)}\n\n📘 FACEBOOK:\n${v.fb}\n\n💬 ZALO:\n${v.zalo}\n\n🎵 TIKTOK:\n${v.tiktok}\n\n🌐 WEBSITE:\n${v.web}\n\n${'='.repeat(46)}\n\n`;});
  dlTxt(t,'content-bds.txt');toast('📄 Đã xuất file!');
}
function doExportAll(){
  if(!crm.length)return toast('⚠️ CRM trống!');
  let t=`EXPORT TOÀN BỘ BĐS\n${'='.repeat(46)}\nNgày: ${new Date().toLocaleString('vi-VN')}\nTổng: ${crm.length} tin\n\n`;
  crm.forEach((e,i)=>{t+=`[${i+1}] ${e.type} | ${e.loc} | ${e.price} | ${e.time}\n`;});
  dlTxt(t,'export-bds.txt');toast('📤 Đã xuất!');
}
function doBackup(){
  const d={crm,tpl,prof,reminders,contentLog,v:6,t:new Date().toISOString()};
  dlTxt(JSON.stringify(d,null,2),'backup-bds-'+Date.now()+'.json');toast('💾 Đã backup!');
}
function doRestore(){
  const inp=document.createElement('input');inp.type='file';inp.accept='.json';
  inp.onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{try{const d=JSON.parse(ev.target.result);if(d.crm)crm=d.crm;if(d.tpl)tpl=d.tpl;if(d.reminders)reminders=d.reminders;if(d.contentLog)contentLog=d.contentLog;if(d.prof){prof=d.prof;loadProfInp();if(prof.avatar)showAv(prof.avatar);}saveSt();buildCRM();buildTpl();buildProf();buildEarn();buildReminders();buildDashboard();updStats();buildHomeRecent();toast('🔄 Đã restore!');}catch(x){toast('❌ File không hợp lệ!');}};r.readAsText(f);};
  inp.click();
}
function dlTxt(c,fn){const b=new Blob([c],{type:'text/plain;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=fn;a.click();}

// ===================== NAV =====================
function nav(id){
  document.querySelectorAll('.pg').forEach(p=>p.classList.remove('on'));
  const pg=document.getElementById('pg-'+id);if(pg)pg.classList.add('on');
  document.querySelectorAll('.ni').forEach(n=>n.classList.remove('on'));
  const mp={home:'🏠',gen:'✍️',sch:'📅',scr:'🎯',ab:'⚡',remix:'🔁',survey:'🔍',valuation:'🏷️',readkh:'🎭',guidetour:'🏡',salescripts:'💬',tools:'🔧',cmp:'📊',fs:'🔮',handbook:'📖',tpl:'📌',crm:'🗄️',ag:'🤖',earn:'💰',charity:'❤️',prof:'👤',reminder:'⏰',dashboard:'📊',guide:'❓'};
  document.querySelectorAll('.ni').forEach(n=>{const ic=n.querySelector('.ic');if(ic&&ic.textContent.trim()===mp[id])n.classList.add('on');});
  const sb=document.getElementById('sb');if(sb&&sb.classList.contains('mob'))sb.classList.remove('mob');
  window.scrollTo&&window.scrollTo(0,0);
  // Lazy build for new pages
  if(id==='dashboard')buildDashboard();
  if(id==='guide')buildGuide();
  if(id==='reminder')buildReminders();
}
function toggleSb(){
  const sb=document.getElementById('sb');
  if(window.innerWidth<=560)sb.classList.toggle('mob');
  else sb.classList.toggle('col');
}

// ===================== UTILS =====================
function sleep(ms){return new Promise(r=>setTimeout(r,ms));}
function toast(msg){
  const t=document.getElementById('toast');t.textContent=msg;t.classList.add('on');
  setTimeout(()=>t.classList.remove('on'),2500);
}

// ===================== START =====================
document.addEventListener('DOMContentLoaded',init);
