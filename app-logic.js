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
authorProf={name:'Trần Thế Vinh',title:'Chuyên gia tư vấn BĐS TP.HCM',phone:'0938.121.937',zalo:'0792.227.522',quote:'Lời nói có thể truyền cảm hứng, nhưng chỉ có hành động mới mang bạn đến gần ước mơ.',avatar:'',link:'https://zalo.me/0792227522',social:'@tranthevinh'},
prof={name:'',title:'',phone:'',zalo:'',quote:'',avatar:''},
selEl='Kim',selPsy='Si',selFrm='AIDA',
schedProp='',svData={},rkAnswers=[],
saleScripts=[...DEFAULT_SCRIPTS],curSaleCat='Chốt deal';

// KH Labels state — khai báo sớm để buildDashboard dùng được
let khList=[];

// 6-Can state — khai báo sớm để buildDashboard dùng được  
let sc6Data={
  slots:Array.from({length:6},(_,i)=>({id:i+1,addr:'',type:'',price:'',area:'',floors:'',pros:'',code:'',filled:false})),
  settings:{startDate:'',goal:'Chốt nhanh',platforms:['fb','zalo','tiktok'],dist:'smart',psyList:['Tham','Sân','Si','Nghi ngờ','Ngạo mạn']},
  schedule:[],
  posted:{}
};

// ===================== POST TRACKER =====================
// State: per content-session, keyed by content ID (timestamp)
let trackerState = {fb:false,zalo:false,tiktok:false,web:false};
let trackerNotes = {fb:'',zalo:'',web:'',tiktok:''};
let trackerTimes = {fb:'',zalo:'',tiktok:'',web:''};
let trackerId = 0; // ties tracker to current content

const PLT_LABELS = {fb:'📘 Facebook',zalo:'💬 Zalo',tiktok:'🎵 TikTok',web:'🌐 Website'};

function resetTracker(){
  trackerState={fb:false,zalo:false,tiktok:false,web:false};
  trackerNotes={fb:'',zalo:'',tiktok:'',web:''};
  trackerTimes={fb:'',zalo:'',tiktok:'',web:''};
  renderTracker();
  toast('🔄 Đã reset trạng thái đăng!');
}

function togglePosted(plt){
  trackerState[plt]=!trackerState[plt];
  if(trackerState[plt]){
    trackerTimes[plt]=new Date().toLocaleString('vi-VN');
    toast(`✅ Đánh dấu đã đăng ${PLT_LABELS[plt]}!`);
  } else {
    trackerTimes[plt]='';
  }
  renderTracker();
  // Auto-save posted status into CRM if content exists
  saveTrackerToCRM();
}

function saveTrackerNote(plt,val){
  trackerNotes[plt]=val;
  saveTrackerToCRM();
}

function renderTracker(){
  const plts=['fb','zalo','tiktok','web'];
  let doneCount=0;
  plts.forEach(p=>{
    const row=document.getElementById('tr_'+p);
    const cb=document.getElementById('cb_'+p);
    const tt=document.getElementById('tt_'+p);
    const tn=document.getElementById('tn_'+p);
    if(!row)return;
    if(trackerState[p]){
      row.classList.add('posted');
      if(cb)cb.textContent='✓';
      if(tt)tt.textContent='✅ Đã đăng lúc '+trackerTimes[p];
      doneCount++;
    } else {
      row.classList.remove('posted');
      if(cb)cb.textContent='';
      if(tt)tt.textContent='Chưa đăng';
    }
    if(tn)tn.value=trackerNotes[p]||'';
  });
  // Update progress
  const pct=Math.round(doneCount/4*100);
  const prog=document.getElementById('trackerProgress');
  const bar=document.getElementById('trackerBar');
  const pctEl=document.getElementById('trackerPct');
  const done=document.getElementById('trackerDone');
  if(prog)prog.textContent=doneCount+'/4 nền tảng';
  if(bar)bar.style.width=pct+'%';
  if(pctEl)pctEl.textContent=pct+'%';
  if(done)done.style.display=doneCount===4?'block':'none';
}

function saveTrackerToCRM(){
  // Attach posted status to most recent CRM entry if IDs match
  if(crm.length&&trackerId&&crm[0].id===trackerId){
    crm[0].posted=JSON.parse(JSON.stringify(trackerState));
    crm[0].postedTimes=JSON.parse(JSON.stringify(trackerTimes));
    crm[0].postedNotes=JSON.parse(JSON.stringify(trackerNotes));
    saveSt();
    updStats();
  }
}

// ===================== MÃ CĂN — SYNC 3 CHIỀU =====================

// Đồng bộ mã căn giữa 3 form: gen ↔ survey ↔ valuation
function syncCodeFields(source){
  const ids={gen:'gen_code',survey:'sv_code',val:'val_code'};
  const src=document.getElementById(ids[source]);
  if(!src)return;
  const code=src.value.trim();
  if(!code)return toast('⚠️ Ô mã căn đang trống!');
  Object.entries(ids).forEach(([k,id])=>{
    if(k===source)return;
    const el=document.getElementById(id);
    if(el)el.value=code;
  });
  // Update status label in gen
  const st=document.getElementById('genCodeStatus');
  if(st)st.textContent=`✅ Đã đồng bộ lúc ${new Date().toLocaleTimeString('vi-VN',{hour:'2-digit',minute:'2-digit'})}`;
  toast(`🔄 Đã đồng bộ mã căn "${code}" sang tất cả form!`);
}

// Lấy mã căn hiện tại từ form nào đang có
function getActiveCode(){
  return (document.getElementById('gen_code')?.value||document.getElementById('sv_code')?.value||document.getElementById('val_code')?.value||'').trim();
}

// Điền mã căn vào tất cả form
function fillCodeAll(code){
  ['gen_code','sv_code','val_code'].forEach(id=>{
    const el=document.getElementById(id);if(el)el.value=code;
  });
  const st=document.getElementById('genCodeStatus');
  if(st&&code)st.textContent=`📌 Mã: ${code}`;
}

// ===================== SAVE OUTPUT HELPER =====================
function saveOutputToLibrary(name,content,type){
  if(!content||content.length<5)return toast('⚠️ Không có nội dung để lưu!');
  const item={id:Date.now(),name,time:new Date().toLocaleString('vi-VN'),type,content,vs:[{py:type,frm:'',gs:[],fb:content,zalo:content,tiktok:content,web:content}]};
  tpl.unshift(item);saveSt();buildTpl();updStats();toast('✅ Đã lưu vào Thư viện: '+name);
}

// ===================== INIT =====================
function init(){
  loadSt();migrateCRM();
  loadCKState();checkCKReset();loadKHList();
  buildSg();buildPsychCards();buildFrmCards();
  buildAgents();buildFSEl();buildCRM();buildTpl();buildProf();buildEarn();
  updStats();buildHomeRecent();buildHomeWorkflow();buildHomeFeatures();buildHBModules();
  buildSurveySteps();buildReadKH();buildSaleScripts();
  updGoalHint('goalPills_gen');
  buildReminders();checkDueReminders();
  buildDashboard();updCKBadge();
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
    {i:'🏘️',t:'6 Căn',d:'Chọn BĐS',pg:'sixcan'},
    {i:'🔍',t:'Khảo Sát',d:'Thu dữ liệu',pg:'survey'},
    {i:'🏷️',t:'Định Giá',d:'Bóc tách',pg:'valuation'},
    {i:'✍️',t:'Tạo Content',d:'4 nền tảng',pg:'gen'},
    {i:'📅',t:'Lịch 30 Ngày',d:'Auto phân bổ',pg:'sixcan'},
    {i:'🎯',t:'Chấm Điểm',d:'Tối ưu',pg:'scr'},
    {i:'🗄️',t:'Lưu CRM',d:'Quản lý',pg:'crm'}
  ];
  el.innerHTML=steps.map((s,i)=>`<div onclick="nav('${s.pg}')" style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:10px 11px;text-align:center;flex:1;min-width:80px;cursor:pointer;transition:.2s" onmouseover="this.style.borderColor='rgba(245,166,35,.4)'" onmouseout="this.style.borderColor='var(--border)'"><div style="font-size:1.2rem;margin-bottom:3px">${s.i}</div><div style="font-weight:700;font-size:.68rem;color:var(--tx)">${s.t}</div><div style="font-size:.61rem;color:var(--t3)">${s.d}</div></div>${i<steps.length-1?'<div style="color:var(--t3);padding:0 3px;flex-shrink:0">→</div>':''}`).join('');
}

function buildHomeFeatures(){
  const el=document.getElementById('featureGrid');if(!el)return;
  const f=[
    {i:'🏘️',t:'Chiến Thuật 6 Căn',d:'6 BĐS thật × 5 tâm lý = 30 content. Lịch 30 ngày. Bao phủ khu vực.',pg:'sixcan',b:'rd',bl:'🔥HOT'},
    {i:'✍️',t:'Tạo Content',d:'1 input → FB, Zalo, TikTok, Web. 5 tâm lý. 7 công thức.',pg:'gen',b:'or',bl:'CORE'},
    {i:'📅',t:'Lịch 7 Ngày',d:'Tự động từ content đã tạo. Phân bổ theo ngày + giờ vàng.',pg:'sch',b:'gr',bl:''},
    {i:'🔍',t:'Khảo Sát Nhà',d:'9 bước checklist chuẩn. Tự động sinh báo cáo 5x5.',pg:'survey',b:'gr',bl:''},
    {i:'🏷️',t:'Định Giá BĐS',d:'Bóc tách giá đất + xây dựng. Kết nối tạo content.',pg:'valuation',b:'',bl:''},
    {i:'🎭',t:'Đọc Vị KH',d:'10 câu hỏi xác định tâm lý KH. Gợi ý chiến thuật.',pg:'readkh',b:'bl',bl:''},
    {i:'🏡',t:'Dẫn Xem Nhà',d:'Kịch bản từng phòng. Tích hợp dữ liệu khảo sát.',pg:'guidetour',b:'',bl:''},
    {i:'💬',t:'Câu Chốt Sale',d:'50+ câu chốt theo tình huống. Copy ngay dùng liền.',pg:'salescripts',b:'rd',bl:'HOT'},
    {i:'🎯',t:'Chấm Điểm',d:'6 tiêu chí 1–10. Gợi ý cải thiện cụ thể.',pg:'scr',b:'',bl:''},
    {i:'⚡',t:'A/B Testing',d:'So sánh 2 hook, chọn hook tối ưu.',pg:'ab',b:'',bl:''},
    {i:'🔁',t:'Biến Tấu Content',d:'Chẩn đoán tại sao cũ không viral. Viết lại 3 phiên bản.',pg:'remix',b:'',bl:''},
    {i:'📊',t:'Dashboard',d:'Biểu đồ content theo tuần/tháng. Thống kê tổng quan.',pg:'dashboard',b:'or',bl:''},
    {i:'⏰',t:'Nhắc Lịch KH',d:'Đặt nhắc follow-up cho từng khách. Cảnh báo đúng giờ.',pg:'reminder',b:'gr',bl:''},
    {i:'☀️',t:'Checklist Buổi Sáng',d:'14 mục kỷ luật mỗi ngày. Streak, auto reset 6:00 sáng.',pg:'morning',b:'or',bl:''},
    {i:'🎯',t:'KH Theo Nhãn',d:'Nóng/Ấm/Lạnh/Chốt. Lọc nhanh, quản lý ưu tiên.',pg:'khlabels',b:'rd',bl:''},
    {i:'📋',t:'Timeline KH',d:'Ghi lại lịch sử tương tác từng KH.',pg:'timeline',b:'bl',bl:''},
    {i:'📅',t:'Calendar Đăng Tin',d:'Lịch tháng tô màu ngày đăng. Streak, thống kê.',pg:'calendar',b:'gr',bl:''},
    {i:'📖',t:'Hướng dẫn',d:'Hướng dẫn sử dụng đầy đủ từng tính năng.',pg:'guide',b:'',bl:''},
    {i:'📚',t:'Thư Viện Kiến Thức',d:'3 ebook thực chiến: Cẩm Nang Bách Thắng · Ma Trận Tâm Lý · Phá Khoá KH.',pg:'handbook',b:'or',bl:'📚'}
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
  // Reset post tracker và CRM edit mode cho content mới
  trackerState={fb:false,zalo:false,tiktok:false,web:false};
  trackerNotes={fb:'',zalo:'',tiktok:'',web:''};
  trackerTimes={fb:'',zalo:'',tiktok:'',web:''};
  trackerId=0; // content mới chưa có CRM entry
  const banner=document.getElementById('crmEditBanner');if(banner)banner.style.display='none';
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
  renderTracker();
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
function clearGen(){
  ['i_type','i_price','i_area','i_loc','i_pros','i_diff'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  const gc=document.getElementById('gen_code');if(gc)gc.value='';
  const gs=document.getElementById('genCodeStatus');if(gs)gs.textContent='';
  document.getElementById('outArea').classList.remove('on');VS=[];
  // Reset chế độ chỉnh sửa CRM
  trackerId=0;
  const banner=document.getElementById('crmEditBanner');if(banner)banner.style.display='none';
}
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
  const code=(document.getElementById('sv_code')?.value||'').trim();
  if(!addr)return toast('⚠️ Nhập địa chỉ BĐS!');
  svData={addr,price,area,floors,w,d,pros,cons,reason,legal,code,checkedItems:svData.checkedItems||[]};
  // Nếu chưa có mã, sinh tạm từ địa chỉ để hiển thị
  const displayCode=code||`KS-${addr.replace(/[^a-zA-Z0-9]/g,'').substring(0,6).toUpperCase()}-${Date.now().toString().slice(-4)}`;
  const pArr=pros.split('\n').filter(x=>x.trim());
  const cArr=cons.split('\n').filter(x=>x.trim());
  const checked=svData.checkedItems||[];
  document.getElementById('svReport').innerHTML=`
    <div class="sec">📊 Báo cáo 5x5 — ${addr}</div>
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:11px;flex-wrap:wrap">
      <span style="font-family:'Space Mono',monospace;font-size:.75rem;font-weight:700;color:var(--ac);background:rgba(245,166,35,.12);border:1px solid rgba(245,166,35,.3);border-radius:7px;padding:3px 10px">🔢 ${displayCode}</span>
      ${price?`<span style="font-size:.73rem;color:var(--t2);background:var(--bg3);border-radius:7px;padding:3px 9px">💰 ${price}</span>`:''}
      ${area?`<span style="font-size:.73rem;color:var(--t2);background:var(--bg3);border-radius:7px;padding:3px 9px">📐 ${area}m²</span>`:''}
      ${floors?`<span style="font-size:.73rem;color:var(--t2);background:var(--bg3);border-radius:7px;padding:3px 9px">🏗️ ${floors} tầng</span>`:''}
    </div>
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
function buildSvTxt(){const d=svData;return`BÁO CÁO KHẢO SÁT NHÀ\n${'='.repeat(40)}\nMã căn: ${d.code||'—'}\nĐịa chỉ: ${d.addr}\nGiá: ${d.price} | DT: ${d.area}m² | ${d.floors} tầng (${d.w}x${d.d}m)\n\n✅ 5 ƯU ĐIỂM:\n${d.pros}\n\n❌ 5 NHƯỢC ĐIỂM:\n${d.cons}\n\nLý do bán: ${d.reason}\nPháp lý: ${d.legal}\n${'='.repeat(40)}`;}

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
  // Đồng bộ mã căn từ Khảo Sát → Tạo Content & Định Giá
  const svCode=(document.getElementById('sv_code')?.value||'').trim();
  if(svCode)fillCodeAll(svCode);
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
  // Đồng bộ mã căn Khảo Sát → Định Giá
  const svCode2=(document.getElementById('sv_code')?.value||'').trim();
  if(svCode2)fillCodeAll(svCode2);
  nav('valuation');
  toast('✅ Đã điền vào form Định Giá!');
}

function clearSurvey(){
  ['sv_addr','sv_price','sv_area','sv_floors','sv_w','sv_d','sv_pros','sv_cons','sv_reason','sv_legal','sv_code'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
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
    // Đồng bộ mã căn
    const svCode=(document.getElementById('sv_code')?.value||svData.code||'').trim();
    if(svCode)fillCodeAll(svCode);
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
function clearValuation(){['val_addr','val_total','val_area','val_floors','val_w','val_d','val_market','val_pros','val_cons','val_reason','val_legal','val_code'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});document.getElementById('valOut').classList.add('hidden');toast('🗑️ Đã xóa!');}
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
  // Đồng bộ mã căn Định Giá → Tạo Content & Khảo Sát
  const valCode=(document.getElementById('val_code')?.value||'').trim();
  if(valCode)fillCodeAll(valCode);
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

// ===================== ROI ĐẦU TƯ BĐS =====================
function getROIInputs(){
  const price  = parseFloat(document.getElementById('roi_price')?.value)||0;
  const equity = parseFloat(document.getElementById('roi_equity')?.value)||price;
  const loanRate= parseFloat(document.getElementById('roi_loanrate')?.value)||8.5;
  const area   = parseFloat(document.getElementById('roi_area')?.value)||0;
  const rent   = parseFloat(document.getElementById('roi_rent')?.value)||0;
  const growth = parseFloat(document.getElementById('roi_growth')?.value)||5;
  const repair = parseFloat(document.getElementById('roi_repair')?.value)||0;
  const opex   = parseFloat(document.getElementById('roi_opex')?.value)||0;
  const hold   = parseFloat(document.getElementById('roi_hold')?.value)||5;
  const saveRate= parseFloat(document.getElementById('roi_saverate')?.value)||5.5;
  return{price,equity,loanRate,area,rent,growth,repair,opex,hold,saveRate};
}

function roiLiveCalc(){
  const v=getROIInputs();
  if(!v.price||!v.equity)return;
  document.getElementById('roiLive').style.display='block';
  const loan=(v.price-v.equity)*1e9;
  const monthlyLoanPay=loan>0?loan*(v.loanRate/100/12)*Math.pow(1+v.loanRate/100/12,v.hold*12)/(Math.pow(1+v.loanRate/100/12,v.hold*12)-1):0;
  const rentAnnual=v.rent*12*1e6;
  const opexAnnual=v.opex*1e6;
  const loanAnnual=monthlyLoanPay*12;
  const netRentAnnual=rentAnnual-opexAnnual-loanAnnual;
  const totalInvested=(v.equity+v.repair/1e3)*1e9;
  const capitalGainAnnual=v.price*1e9*(v.growth/100);
  const totalAnnualReturn=netRentAnnual+capitalGainAnnual;
  const roi=(totalAnnualReturn/totalInvested)*100;
  const payback=totalAnnualReturn>0?(totalInvested/totalAnnualReturn):999;
  const vsS=roi-v.saveRate;
  document.getElementById('liveROI').textContent=roi.toFixed(1)+'%';
  document.getElementById('livePayback').textContent=payback<99?payback.toFixed(1)+' năm':'∞';
  document.getElementById('liveVsSaving').textContent=(vsS>0?'+':'')+vsS.toFixed(1)+'%';
  document.getElementById('liveROI').style.color=roi>=10?'var(--gr)':roi>=5?'var(--ac)':'var(--rd)';
  document.getElementById('liveVsSaving').style.color=vsS>0?'var(--gr)':'var(--rd)';
}

function doROI(){
  const v=getROIInputs();
  if(!v.price)return toast('⚠️ Nhập giá mua BĐS!');
  if(!v.equity)return toast('⚠️ Nhập vốn tự có!');
  document.getElementById('roiOut').classList.add('hidden');

  // Core calculations
  const priceVND=v.price*1e9;
  const equityVND=v.equity*1e9;
  const loanVND=priceVND-equityVND;
  const repairVND=v.repair*1e6;
  const totalInvested=equityVND+repairVND;
  const loanPctOfPrice=(loanVND/priceVND*100).toFixed(0);

  // Monthly loan payment
  const r=v.loanRate/100/12;
  const n=v.hold*12;
  const monthlyLoan=loanVND>0?loanVND*(r*Math.pow(1+r,n))/(Math.pow(1+r,n)-1):0;
  const annualLoan=monthlyLoan*12;

  // Income & expense
  const rentAnnual=v.rent*1e6*12;
  const opexAnnual=v.opex*1e6;
  const grossRentIncome=rentAnnual;
  const netOperatingIncome=rentAnnual-opexAnnual;
  const cashFlowAnnual=netOperatingIncome-annualLoan;

  // Capital appreciation
  const exitPrice=priceVND*Math.pow(1+v.growth/100,v.hold);
  const capitalGain=exitPrice-priceVND;
  const capitalGainAnnual=capitalGain/v.hold;

  // ROI metrics
  const totalReturnAnnual=cashFlowAnnual+capitalGainAnnual;
  const roi=(totalReturnAnnual/totalInvested)*100;
  const cashOnCash=(cashFlowAnnual/totalInvested)*100;
  const capRate=(netOperatingIncome/priceVND)*100;
  const grossYield=(rentAnnual/priceVND)*100;
  const paybackYears=totalReturnAnnual>0?totalInvested/totalReturnAnnual:999;

  // Savings comparison
  const savingsGrowth=equityVND*Math.pow(1+v.saveRate/100,v.hold);
  const savingsReturn=savingsGrowth-equityVND;
  const bdsReturn=cashFlowAnnual*v.hold+capitalGain;
  const vsS=roi-v.saveRate;
  const advantage=bdsReturn-savingsReturn;

  // Total hold period analysis
  const totalRentCollected=cashFlowAnnual*v.hold;
  const totalProfit=totalRentCollected+capitalGain;

  // Rating
  const rating=roi>=15?{txt:'🏆 Xuất sắc',c:'var(--gr)',sub:'ROI cao — nên đầu tư'}
    :roi>=10?{txt:'👍 Tốt',c:'var(--gr)',sub:'ROI khá — đáng cân nhắc'}
    :roi>=7?{txt:'⚠️ Trung bình',c:'var(--ac)',sub:'ROI vừa — cần cân nhắc kỹ'}
    :roi>=v.saveRate?{txt:'📊 Thấp',c:'var(--ac)',sub:'Nhỉnh hơn tiết kiệm một chút'}
    :{txt:'❌ Kém',c:'var(--rd)',sub:'Thấp hơn gửi tiết kiệm'};

  // Format helpers
  const fmt=n=>n>=1e9?(n/1e9).toFixed(2)+' tỷ':n>=1e6?(n/1e6).toFixed(0)+' tr':'0';

  const roiId='roi_'+Date.now();
  document.getElementById('roiOut').innerHTML=`
    <!-- Header verdict -->
    <div style="background:linear-gradient(135deg,rgba(62,207,142,.12),rgba(245,166,35,.08));border:1.5px solid ${rating.c.replace('var(--gr)','rgba(62,207,142,.5)').replace('var(--ac)','rgba(245,166,35,.5)').replace('var(--rd)','rgba(239,83,80,.5)')};border-radius:12px;padding:15px 16px;margin-bottom:13px">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:9px;margin-bottom:12px">
        <div>
          <div style="font-weight:900;font-size:1rem;color:${rating.c}">${rating.txt} — ROI ${roi.toFixed(1)}%/năm</div>
          <div style="font-size:.74rem;color:var(--t2);margin-top:3px">${rating.sub} · ${v.price} tỷ · ${v.rent} tr/tháng · nắm giữ ${v.hold} năm</div>
        </div>
        <div style="display:flex;gap:7px">
          <button class="btn btn-g btn-sm" onclick="cpTxt(document.getElementById('${roiId}').textContent)">📋 Copy</button>
          <button class="btn btn-r btn-sm" onclick="document.getElementById('roiOut').classList.add('hidden')">🗑️</button>
        </div>
      </div>
      <!-- 4 key metrics -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;text-align:center">
        <div style="background:rgba(0,0,0,.15);border-radius:9px;padding:10px">
          <div style="font-size:1.5rem;font-weight:900;color:${rating.c};font-family:'Space Mono',monospace">${roi.toFixed(1)}%</div>
          <div style="font-size:.63rem;color:var(--t3);margin-top:2px">ROI/năm</div>
        </div>
        <div style="background:rgba(0,0,0,.15);border-radius:9px;padding:10px">
          <div style="font-size:1.5rem;font-weight:900;color:var(--ac);font-family:'Space Mono',monospace">${paybackYears<99?paybackYears.toFixed(1):'∞'}</div>
          <div style="font-size:.63rem;color:var(--t3);margin-top:2px">Năm hoàn vốn</div>
        </div>
        <div style="background:rgba(0,0,0,.15);border-radius:9px;padding:10px">
          <div style="font-size:1.5rem;font-weight:900;color:${vsS>0?'var(--gr)':'var(--rd)'};font-family:'Space Mono',monospace">${vsS>0?'+':''}${vsS.toFixed(1)}%</div>
          <div style="font-size:.63rem;color:var(--t3);margin-top:2px">vs Tiết kiệm</div>
        </div>
        <div style="background:rgba(0,0,0,.15);border-radius:9px;padding:10px">
          <div style="font-size:1.5rem;font-weight:900;color:${cashFlowAnnual>=0?'var(--gr)':'var(--rd)'};font-family:'Space Mono',monospace">${fmt(cashFlowAnnual)}</div>
          <div style="font-size:.63rem;color:var(--t3);margin-top:2px">Dòng tiền/năm</div>
        </div>
      </div>
    </div>

    <!-- Detail breakdown -->
    <div id="${roiId}" style="display:none"></div>
    <div class="card" style="margin-bottom:10px">
      <div class="ctit"><span class="dot"></span>💰 Phân tích vốn đầu tư</div>
      <div style="display:grid;gap:5px;font-size:.77rem">
        <div style="display:flex;justify-content:space-between;padding:5px 9px;background:var(--bg3);border-radius:7px"><span style="color:var(--t2)">Giá mua BĐS</span><strong style="color:var(--ac)">${fmt(priceVND)}</strong></div>
        <div style="display:flex;justify-content:space-between;padding:5px 9px;background:var(--bg3);border-radius:7px"><span style="color:var(--t2)">Vốn tự có (${(v.equity/v.price*100).toFixed(0)}%)</span><strong style="color:var(--gr)">${fmt(equityVND)}</strong></div>
        ${loanVND>0?`<div style="display:flex;justify-content:space-between;padding:5px 9px;background:var(--bg3);border-radius:7px"><span style="color:var(--t2)">Vay ngân hàng (${loanPctOfPrice}%)</span><strong style="color:var(--bl)">${fmt(loanVND)}</strong></div>`:'' }
        <div style="display:flex;justify-content:space-between;padding:5px 9px;background:var(--bg3);border-radius:7px"><span style="color:var(--t2)">Chi phí sửa chữa ban đầu</span><strong>${fmt(repairVND)}</strong></div>
        <div style="display:flex;justify-content:space-between;padding:6px 9px;background:rgba(245,166,35,.1);border-radius:7px;border:1px solid rgba(245,166,35,.3)"><span style="font-weight:700;color:var(--tx)">Tổng vốn đầu tư thực</span><strong style="color:var(--ac);font-size:.9rem">${fmt(totalInvested)}</strong></div>
      </div>
    </div>

    <div class="card" style="margin-bottom:10px">
      <div class="ctit"><span class="dot"></span>📊 Thu nhập & Chi phí hàng năm</div>
      <div style="display:grid;gap:5px;font-size:.77rem">
        <div style="display:flex;justify-content:space-between;padding:5px 9px;background:rgba(62,207,142,.08);border-radius:7px"><span style="color:var(--t2)">Thu nhập thuê (${v.rent} tr × 12 tháng)</span><strong style="color:var(--gr)">+ ${fmt(rentAnnual)}</strong></div>
        <div style="display:flex;justify-content:space-between;padding:5px 9px;background:var(--bg3);border-radius:7px"><span style="color:var(--t2)">Chi phí vận hành/năm</span><strong style="color:var(--rd)">− ${fmt(opexAnnual)}</strong></div>
        ${loanVND>0?`<div style="display:flex;justify-content:space-between;padding:5px 9px;background:var(--bg3);border-radius:7px"><span style="color:var(--t2)">Trả nợ ngân hàng/năm</span><strong style="color:var(--rd)">− ${fmt(annualLoan)}</strong></div>`:''}
        <div style="display:flex;justify-content:space-between;padding:6px 9px;background:${cashFlowAnnual>=0?'rgba(62,207,142,.1)':'rgba(239,83,80,.1)'};border-radius:7px;border:1px solid ${cashFlowAnnual>=0?'rgba(62,207,142,.3)':'rgba(239,83,80,.3)'}"><span style="font-weight:700;color:var(--tx)">Dòng tiền ròng/năm</span><strong style="color:${cashFlowAnnual>=0?'var(--gr)':'var(--rd)'};">${cashFlowAnnual>=0?'+':''}${fmt(cashFlowAnnual)}</strong></div>
        <div style="display:flex;justify-content:space-between;padding:5px 9px;background:rgba(76,156,245,.08);border-radius:7px"><span style="color:var(--t2)">Tăng giá BĐS ước tính/năm (${v.growth}%)</span><strong style="color:var(--bl)">+ ${fmt(capitalGainAnnual)}</strong></div>
        <div style="display:flex;justify-content:space-between;padding:6px 9px;background:rgba(245,166,35,.1);border-radius:7px;border:1px solid rgba(245,166,35,.3)"><span style="font-weight:700;color:var(--tx)">Tổng lợi nhuận/năm</span><strong style="color:var(--ac);font-size:.9rem">${fmt(totalReturnAnnual)}</strong></div>
      </div>
    </div>

    <div class="card" style="margin-bottom:10px">
      <div class="ctit"><span class="dot"></span>🏁 Kết quả sau ${v.hold} năm nắm giữ</div>
      <div style="display:grid;gap:5px;font-size:.77rem">
        <div style="display:flex;justify-content:space-between;padding:5px 9px;background:var(--bg3);border-radius:7px"><span style="color:var(--t2)">Giá bán ước tính</span><strong style="color:var(--ac)">${fmt(exitPrice)}</strong></div>
        <div style="display:flex;justify-content:space-between;padding:5px 9px;background:var(--bg3);border-radius:7px"><span style="color:var(--t2)">Lãi vốn (tăng giá)</span><strong style="color:var(--gr)">+${fmt(capitalGain)}</strong></div>
        <div style="display:flex;justify-content:space-between;padding:5px 9px;background:var(--bg3);border-radius:7px"><span style="color:var(--t2)">Tiền thuê tích lũy (ròng)</span><strong style="color:var(--gr)">+${fmt(totalRentCollected)}</strong></div>
        <div style="display:flex;justify-content:space-between;padding:6px 9px;background:linear-gradient(135deg,rgba(62,207,142,.12),rgba(245,166,35,.08));border-radius:7px;border:1px solid rgba(62,207,142,.4)"><span style="font-weight:700;color:var(--tx)">Tổng lợi nhuận ${v.hold} năm</span><strong style="color:var(--gr);font-size:1rem">+${fmt(totalProfit)}</strong></div>
      </div>
    </div>

    <div class="card" style="margin-bottom:10px;border-color:rgba(76,156,245,.3)">
      <div class="ctit"><span class="dot" style="background:var(--bl)"></span>🏦 So sánh với gửi tiết kiệm ${v.saveRate}%/năm</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:9px">
        <div style="background:rgba(62,207,142,.1);border-radius:9px;padding:11px;text-align:center">
          <div style="font-size:.68rem;color:var(--t3);margin-bottom:4px">🏠 Đầu tư BĐS (${v.hold} năm)</div>
          <div style="font-size:1.3rem;font-weight:900;color:var(--gr)">${fmt(bdsReturn)}</div>
          <div style="font-size:.65rem;color:var(--gr);margin-top:2px">ROI: ${roi.toFixed(1)}%/năm</div>
        </div>
        <div style="background:rgba(76,156,245,.1);border-radius:9px;padding:11px;text-align:center">
          <div style="font-size:.68rem;color:var(--t3);margin-bottom:4px">🏦 Gửi tiết kiệm (${v.hold} năm)</div>
          <div style="font-size:1.3rem;font-weight:900;color:var(--bl)">${fmt(savingsReturn)}</div>
          <div style="font-size:.65rem;color:var(--bl);margin-top:2px">Lãi: ${v.saveRate}%/năm</div>
        </div>
      </div>
      <div style="background:${advantage>0?'rgba(62,207,142,.12)':'rgba(239,83,80,.1)'};border:1px solid ${advantage>0?'rgba(62,207,142,.4)':'rgba(239,83,80,.4)'};border-radius:9px;padding:10px;text-align:center;font-size:.8rem">
        ${advantage>0
          ?`🏆 <strong style="color:var(--gr)">BĐS lợi hơn tiết kiệm +${fmt(advantage)}</strong> sau ${v.hold} năm`
          :`⚠️ <strong style="color:var(--rd)">BĐS thua tiết kiệm ${fmt(Math.abs(advantage))}</strong> — xem lại thông số đầu vào`}
      </div>
    </div>

    <!-- KPIs cho môi giới -->
    <div class="card" style="margin-bottom:10px;border-color:rgba(156,110,245,.3)">
      <div class="ctit"><span class="dot" style="background:var(--pu)"></span>📋 Chỉ số KPI chuyên nghiệp</div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;font-size:.75rem">
        <div style="background:var(--bg3);border-radius:7px;padding:8px 10px;display:flex;justify-content:space-between"><span style="color:var(--t2)">Gross Yield</span><strong style="color:var(--pu)">${grossYield.toFixed(1)}%/năm</strong></div>
        <div style="background:var(--bg3);border-radius:7px;padding:8px 10px;display:flex;justify-content:space-between"><span style="color:var(--t2)">Cap Rate</span><strong style="color:var(--pu)">${capRate.toFixed(1)}%/năm</strong></div>
        <div style="background:var(--bg3);border-radius:7px;padding:8px 10px;display:flex;justify-content:space-between"><span style="color:var(--t2)">Cash-on-Cash</span><strong style="color:${cashOnCash>=0?'var(--gr)':'var(--rd)'}">${cashOnCash.toFixed(1)}%/năm</strong></div>
        ${v.area?`<div style="background:var(--bg3);border-radius:7px;padding:8px 10px;display:flex;justify-content:space-between"><span style="color:var(--t2)">Giá/m²</span><strong style="color:var(--ac)">${(v.price*1e3/v.area).toFixed(0)} tr/m²</strong></div>`:''}
      </div>
      <div style="margin-top:9px;background:rgba(156,110,245,.08);border-radius:8px;padding:9px 11px;font-size:.72rem;color:var(--t2);line-height:1.7">
        💡 <strong style="color:var(--pu)">Gợi ý dùng cho KH đầu tư:</strong><br>
        "Căn này Gross Yield ${grossYield.toFixed(1)}%/năm, Cap Rate ${capRate.toFixed(1)}% — cao hơn gửi tiết kiệm ${v.saveRate}% là ${(grossYield-v.saveRate).toFixed(1)}%. 
        Với vốn ${fmt(equityVND)}, dự kiến hoàn vốn trong ${paybackYears<99?paybackYears.toFixed(1)+' năm':'thời gian dài'}, tổng lợi nhuận ${v.hold} năm ước tính ${fmt(totalProfit)}."
      </div>
    </div>`;

  // Store in hidden div for copy
  document.getElementById(roiId).textContent=
    `BÁO CÁO ROI ĐẦU TƯ BĐS\n${'='.repeat(44)}\n`+
    `Giá mua: ${v.price} tỷ | Vốn tự có: ${v.equity} tỷ | Thuê: ${v.rent} tr/tháng\n`+
    `Tăng giá: ${v.growth}%/năm | Nắm giữ: ${v.hold} năm\n\n`+
    `ROI/năm: ${roi.toFixed(1)}% | Hoàn vốn: ${paybackYears<99?paybackYears.toFixed(1)+' năm':'dài hạn'}\n`+
    `So với TK ${v.saveRate}%: ${vsS>0?'+':''}${vsS.toFixed(1)}% | Dòng tiền: ${fmt(cashFlowAnnual)}/năm\n`+
    `Lợi nhuận ${v.hold} năm: ${fmt(totalProfit)}\n\n`+
    `Gross Yield: ${grossYield.toFixed(1)}% | Cap Rate: ${capRate.toFixed(1)}% | Cash-on-Cash: ${cashOnCash.toFixed(1)}%`;

  document.getElementById('roiOut').classList.remove('hidden');
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

// ===================== PERSONA KH THÔNG MINH (NÂNG CẤP) =====================
let personaData={budget:'',purpose:'',timeline:'',status:'',area:'',extra:''};

function buildSmartPersona(){
  const el=document.getElementById('personaOut');if(!el)return;
  const budget=document.getElementById('persona_budget')?.value||'';
  const purpose=document.getElementById('persona_purpose')?.value||'';
  const timeline=document.getElementById('persona_timeline')?.value||'';
  const status=document.getElementById('persona_status')?.value||'';
  const area=V('persona_area');
  const extra=V('persona_extra');
  if(!budget||!purpose)return toast('⚠️ Chọn ít nhất Ngân sách & Mục đích!');

  // Map answers → psychology
  const psyMap={
    'dautu':'Tham','chottien':'Tham',
    'o_thuc':'Si','giadinh':'Si',
    'lantdau':'Si','chothue':'Tham',
    'nhanh':'Sân','1thang':'Sân',
    'danhtim':'Nghi ngờ','so_lua':'Nghi ngờ',
    'caocp':'Ngạo mạn','premium':'Ngạo mạn'
  };
  let psy='Si';
  if(purpose==='dautu'||purpose==='chottien')psy='Tham';
  else if(purpose==='caocp')psy='Ngạo mạn';
  else if(status==='danhtim'||status==='so_lua')psy='Nghi ngờ';
  else if(timeline==='1thang'||timeline==='nhanh')psy='Sân';
  else psy='Si';

  const psyCfg=SC_PSY_CFG[psy]||SC_PSY_CFG['Si'];

  // Budget display
  const budgetLabel={
    'duoi2':'Dưới 2 tỷ','2den5':'2–5 tỷ','5den10':'5–10 tỷ','tren10':'Trên 10 tỷ','thue':'Thuê (5–20 tr/tháng)'
  }[budget]||budget;

  // Purpose display
  const purposeLabel={
    'o_thuc':'🏠 Mua ở thực','dautu':'📈 Đầu tư sinh lời','chothue':'🔑 Mua cho thuê lại','giadinh':'👨‍👩‍👧 An cư cho gia đình','caocp':'💎 Nâng cấp cuộc sống'
  }[purpose]||purpose;

  // Timeline display
  const timelineLabel={
    '1thang':'Trong vòng 1 tháng','3thang':'1–3 tháng','6thang':'3–6 tháng','chuaro':'Chưa rõ, đang tìm hiểu'
  }[timeline]||timeline;

  // Status display
  const statusLabel={
    'danhtue':'Đang thuê nhà','songcunggia':'Sống cùng gia đình','cosannhung':'Có sẵn nhà nhưng muốn đổi','danhtim':'Đang tìm nhiều nơi'
  }[status]||status;

  // Generate approach script
  const approaches={
    'Tham':{
      open:'Dẫn đầu bằng giá và cơ hội sinh lời. Hỏi ngay: "Anh/chị kỳ vọng ROI bao nhiêu %/năm?"',
      content:'Nhấn giá thấp hơn thị trường, tiềm năng tăng giá khu vực, so sánh với gửi tiết kiệm',
      close:'Urgency + khan hiếm: "Tuần này còn 1 căn, tuần sau chủ tăng giá"',
      avoid:'Không nói về cảm xúc, không đề cập sống đẹp — chỉ nói số liệu'
    },
    'Sân':{
      open:'Đi thẳng vào vấn đề. Đừng vòng vo. Báo giá và thông số ngay trong 2 phút đầu',
      content:'Nhấn: đẹp hơn căn cùng giá, vị trí tốt hơn, hẻm rộng hơn — so sánh trực tiếp',
      close:'Quyết đoán: "Anh/chị xem ngay sáng mai không? Em giữ lịch cho"',
      avoid:'Không giải thích dài, không hỏi nhiều câu — KH này mất kiên nhẫn nhanh'
    },
    'Si':{
      open:'Hỏi về gia đình trước: "Gia đình anh/chị mấy người? Bé mấy tuổi?" — tạo kết nối cảm xúc',
      content:'Hình ảnh cuộc sống: sáng đưa con đi học gần, buổi tối sum họp, không gian riêng tư',
      close:'Mental ownership: "Nếu là nhà mình, anh/chị sẽ đặt phòng ngủ master ở tầng nào?"',
      avoid:'Không đi vào số liệu ROI — KH này mua bằng cảm xúc, không phải lý trí'
    },
    'Nghi ngờ':{
      open:'Chủ động đưa bằng chứng trước khi KH hỏi: scan sổ hồng, cam kết hoàn tiền',
      content:'Nhấn: minh bạch 100%, video quay thực tế, pháp lý rõ ràng không ẩn phí',
      close:'Đề nghị ra phòng công chứng kiểm tra hồ sơ trước — không mất gì cả',
      avoid:'Không hứa hẹn mơ hồ, không dùng từ "chắc" hay "có lẽ" — phải chắc chắn 100%'
    },
    'Ngạo mạn':{
      open:'Tiếp cận như ngang hàng, không sales rẻ tiền: "Em có sản phẩm dành cho người có gu"',
      content:'Nhấn: khu dân cư chất lượng, không gian riêng tư, thiết kế độc bản, chủ nhân xứng tầm',
      close:'Giới hạn số lượng: "Sản phẩm này không dành cho tất cả, em muốn giới thiệu cho anh/chị trước"',
      avoid:'Không giảm giá ngay, không năn nỉ — mất đẳng cấp trong mắt KH này'
    }
  };
  const appr=approaches[psy];

  // Generate matching BDS suggestion
  const bdsMatch={
    'duoi2':['Nhà hẻm','Căn hộ mini','Đất nền vùng ven'],
    '2den5':['Nhà phố hẻm xe hơi','Căn hộ 2PN','Nhà cấp 4 mở rộng'],
    '5den10':['Nhà phố mặt tiền hẻm lớn','Căn hộ cao cấp','Biệt thự nhỏ'],
    'tren10':['Nhà mặt tiền','Biệt thự','Penthouse','Shophouse'],
    'thue':['Căn hộ dịch vụ','Nhà nguyên căn cho thuê']
  }[budget]||['Nhà phố','Căn hộ'];

  el.classList.remove('hidden');
  el.innerHTML=`
    <!-- Persona card -->
    <div style="background:linear-gradient(135deg,${psyCfg.bg},rgba(0,0,0,0));border:1.5px solid ${psyCfg.border};border-radius:12px;padding:15px 16px;margin-bottom:13px">
      <div style="display:flex;align-items:center;gap:11px;margin-bottom:12px">
        <div style="width:46px;height:46px;border-radius:50%;background:linear-gradient(135deg,var(--ac),var(--a2));display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0">${psyCfg.e}</div>
        <div style="flex:1">
          <div style="font-weight:800;font-size:.95rem;color:var(--tx)">Tâm lý: <span style="color:${psyCfg.c}">${psy}</span></div>
          <div style="font-size:.72rem;color:var(--t2);margin-top:2px">${purposeLabel} · ${budgetLabel} · ${timelineLabel||'Chưa rõ timeline'}</div>
        </div>
        <button class="btn btn-s btn-xs" onclick="document.getElementById('personaOut').classList.add('hidden')">✕</button>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div style="background:rgba(0,0,0,.15);border-radius:8px;padding:9px">
          <div style="font-size:.65rem;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px">📋 Thông tin</div>
          <div style="font-size:.72rem;color:var(--t2);line-height:1.7">💰 ${budgetLabel}<br>🎯 ${purposeLabel}<br>⏰ ${timelineLabel||'Chưa rõ'}<br>🏠 ${statusLabel||'Chưa rõ'}${area?`<br>📍 ${area}`:''}
          </div>
        </div>
        <div style="background:rgba(0,0,0,.15);border-radius:8px;padding:9px">
          <div style="font-size:.65rem;font-weight:700;color:var(--t3);text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px">🏠 BĐS phù hợp</div>
          <div style="font-size:.72rem;color:var(--t2);line-height:1.7">${bdsMatch.map(b=>`✅ ${b}`).join('<br>')}${area?`<br>📍 Khu vực: ${area}`:''}</div>
        </div>
      </div>
    </div>

    <!-- Approach guide -->
    <div class="card" style="margin-bottom:9px">
      <div class="ctit"><span class="dot"></span>🎯 Chiến thuật tiếp cận — Tâm lý ${psy}</div>
      <div style="display:grid;gap:7px">
        <div style="background:rgba(62,207,142,.08);border:1px solid rgba(62,207,142,.25);border-radius:8px;padding:9px 11px">
          <div style="font-size:.68rem;font-weight:700;color:var(--gr);margin-bottom:3px">🚀 Mở đầu cuộc trò chuyện</div>
          <div style="font-size:.76rem;color:var(--t2);line-height:1.6">${appr.open}</div>
        </div>
        <div style="background:rgba(245,166,35,.08);border:1px solid rgba(245,166,35,.25);border-radius:8px;padding:9px 11px">
          <div style="font-size:.68rem;font-weight:700;color:var(--ac);margin-bottom:3px">✍️ Content nên nhấn mạnh</div>
          <div style="font-size:.76rem;color:var(--t2);line-height:1.6">${appr.content}</div>
        </div>
        <div style="background:rgba(76,156,245,.08);border:1px solid rgba(76,156,245,.25);border-radius:8px;padding:9px 11px">
          <div style="font-size:.68rem;font-weight:700;color:var(--bl);margin-bottom:3px">💰 Câu chốt deal</div>
          <div style="font-size:.76rem;color:var(--t2);line-height:1.6">${appr.close}</div>
        </div>
        <div style="background:rgba(239,83,80,.08);border:1px solid rgba(239,83,80,.25);border-radius:8px;padding:9px 11px">
          <div style="font-size:.68rem;font-weight:700;color:var(--rd);margin-bottom:3px">⛔ Tuyệt đối tránh</div>
          <div style="font-size:.76rem;color:var(--t2);line-height:1.6">${appr.avoid}</div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div style="display:flex;gap:7px;flex-wrap:wrap">
      <button class="btn btn-p btn-sm" onclick="addKHFromPersona('${psy}','${budget}','${purpose}','${area}','${extra}')">➕ Thêm vào KH Labels</button>
      <button class="btn btn-g btn-sm" onclick="nav('gen');document.getElementById('autoSmart').checked=false;setTimeout(()=>{document.querySelectorAll('.psy-card').forEach(c=>c.dataset.p==='${psy}'?c.click():'')},200)">✍️ Tạo content tâm lý này</button>
      <button class="btn btn-r btn-sm" onclick="resetPersonaForm()">🔄 Phân tích lại</button>
    </div>`;
}

function addKHFromPersona(psy,budget,purpose,area,extra){
  const name=V('persona_khname')||'KH mới';
  const phone=V('persona_khphone')||'';
  loadKHList();
  const label=psy==='Tham'?'hot':psy==='Sân'?'warm':'warm';
  khList.unshift({id:Date.now(),name,phone,prop:area||'',label,note:`Tâm lý: ${psy} · ${budget} · ${purpose}`,created:new Date().toLocaleString('vi-VN'),interactions:[]});
  saveKHList();toast(`✅ Đã thêm "${name}" vào KH Labels!`);
}

function resetPersonaForm(){
  ['persona_budget','persona_purpose','persona_timeline','persona_status'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  ['persona_area','persona_extra','persona_khname','persona_khphone'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  const el=document.getElementById('personaOut');if(el)el.classList.add('hidden');
}

// ===================== EMAIL THÔNG MINH + CRM (NÂNG CẤP) =====================
function buildSmartEmailKH(){
  // Populate KH select from khList + CRM
  loadKHList();
  const sel=document.getElementById('email_kh_select');
  if(sel){
    const allKH=[
      ...khList.map(k=>({id:'khl_'+k.id,name:k.name,phone:k.phone,prop:k.prop,src:'khl'})),
      ...reminders.filter(r=>r.khName).map(r=>({id:'rem_'+r.id,name:r.khName,phone:r.phone,prop:r.property,src:'rem'}))
    ];
    // Dedupe by name
    const seen=new Set();
    const unique=allKH.filter(k=>{if(seen.has(k.name))return false;seen.add(k.name);return true;});
    sel.innerHTML='<option value="">-- Chọn KH --</option>'+unique.map(k=>`<option value="${k.id}" data-name="${k.name}" data-phone="${k.phone||''}" data-prop="${k.prop||''}">${k.name}${k.phone?' ('+k.phone+')':''}</option>`).join('');
  }
}

function genSmartEmail(){
  const sel=document.getElementById('email_kh_select');
  const type=document.getElementById('email_type')?.value||'intro';
  const bds=V('email_bds');
  const el=document.getElementById('emailOut');if(!el)return;

  // Get KH info
  let khName='anh/chị';let khPhone='';let khProp=bds;
  if(sel&&sel.value){
    const opt=sel.options[sel.selectedIndex];
    khName=opt.dataset.name||'anh/chị';
    khPhone=opt.dataset.phone||'';
    khProp=bds||opt.dataset.prop||'BĐS quan tâm';
  }
  if(!khName||khName==='anh/chị')return toast('⚠️ Chọn KH hoặc nhập tên KH!');

  // My info from profile
  const myName=prof.name||'[Tên môi giới]';
  const myPhone=prof.phone||'[SĐT]';
  const myZalo=prof.zalo||prof.phone||'[Zalo]';
  const myTitle=prof.title||'Chuyên gia tư vấn BĐS';

  const sig=`\nTrân trọng,\n${myName} — ${myTitle}\n📞 ${myPhone} | 💬 Zalo: ${myZalo}`;

  const templates={
    intro:{
      title:'✉️ Email 1 — Giới thiệu lần đầu',
      body:`Chào ${khName}!

Em ${myName} — ${myTitle}.

Em biết ${khName} đang quan tâm đến BĐS khu vực${khProp?' ('+khProp+')':''}.

Em có ${bds||'vài căn phù hợp'} — giá tốt, pháp lý rõ ràng, sổ hồng riêng.

${khName} có thể dành 10–15 phút để em giới thiệu trực tiếp không ạ? Em sắp lịch theo giờ thuận tiện của ${khName}.${sig}`
    },
    followup3:{
      title:'✉️ Email 2 — Follow-up ngày 3',
      body:`Chào ${khName}!

Em ${myName} muốn hỏi thăm — ${khName} đã có dịp xem thông tin căn${khProp?' '+khProp:''} em gửi chưa ạ?

Tuần này em vừa có thêm 1 căn mới cùng khu — vị trí và giá còn tốt hơn. Em muốn ${khName} được xem trước.

${khName} rảnh sáng hay chiều để em đưa đi xem thực tế ạ?${sig}`
    },
    value:{
      title:'✉️ Email 3 — Cung cấp giá trị (không bán)',
      body:`Chào ${khName}!

Em ${myName} gửi ${khName} thông tin thị trường BĐS${khProp?' khu vực '+khProp:''} tháng này:

• Giá trung bình: đang ổn định, chưa có dấu hiệu tăng mạnh
• Thanh khoản: tốt ở phân khúc 3–7 tỷ
• Xu hướng: KH đang có xu hướng ưu tiên hẻm xe hơi + pháp lý sạch

Không cần phản hồi ạ — em chỉ muốn ${khName} có thêm thông tin hữu ích để quyết định đúng thời điểm.${sig}`
    },
    remind:{
      title:'✉️ Email 4 — Nhắc lịch xem nhà',
      body:`Chào ${khName}!

Em ${myName} nhắc lịch xem nhà${khProp?' '+khProp:''} theo lịch hẹn.

${khName} vẫn còn tiện không ạ? Nếu cần đổi giờ, ${khName} cứ nhắn em qua Zalo ${myZalo} — em linh động theo ạ.

Em đã chuẩn bị đầy đủ hồ sơ, sổ hồng và thông tin pháp lý để ${khName} xem trực tiếp.${sig}`
    },
    birthday:{
      title:'🎂 Email — Chúc mừng sinh nhật',
      body:`Chào ${khName}!

Nhân dịp sinh nhật, em ${myName} gửi đến ${khName} lời chúc sức khoẻ, hạnh phúc và mọi điều tốt đẹp nhất! 🎉

Chúc ${khName} một ngày sinh nhật thật vui vẻ bên gia đình và người thân ạ.

Nếu ${khName} có nhu cầu tìm nhà hay đầu tư BĐS, em luôn sẵn sàng hỗ trợ nhé!${sig}`
    }
  };

  const tmpl=templates[type]||templates.intro;
  const eid='em_'+Date.now();
  el.classList.remove('hidden');
  el.innerHTML=`
    <div class="card" style="border-color:rgba(76,156,245,.35)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;flex-wrap:wrap;gap:7px">
        <div class="ctit" style="margin:0"><span class="dot"></span>${tmpl.title}</div>
        <div style="display:flex;gap:6px">
          <button class="btn btn-g btn-sm" onclick="cpEl('em_pre_${eid}')">📋 Copy</button>
          <button class="btn btn-b btn-sm" onclick="saveOutputToLibrary('📧 ${tmpl.title} — ${khName}',document.getElementById('em_pre_${eid}').textContent,'email')">💾 Lưu</button>
        </div>
      </div>
      <div style="background:rgba(76,156,245,.07);border-radius:7px;padding:6px 10px;margin-bottom:9px;font-size:.7rem;color:var(--bl)">
        👤 Gửi cho: <strong>${khName}</strong>${khPhone?' · 📞 '+khPhone:''} ${khProp?'· 🏠 '+khProp:''}
      </div>
      <pre id="em_pre_${eid}" style="white-space:pre-wrap;font-family:'Be Vietnam Pro',sans-serif;font-size:.78rem;color:var(--t2);line-height:1.8;background:var(--bg3);border-radius:9px;padding:12px">${tmpl.body}</pre>
      ${!prof.name?`<div style="background:rgba(239,83,80,.08);border:1px solid rgba(239,83,80,.3);border-radius:8px;padding:8px 11px;margin-top:9px;font-size:.72rem;color:var(--rd)">⚠️ Chưa điền Hồ Sơ — email đang dùng placeholder. <span style="cursor:pointer;text-decoration:underline" onclick="nav('prof')">Điền Hồ Sơ ngay →</span></div>`:''}
    </div>`;
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
// ===================== CRM — MÃ CĂN + BỘ LỌC + TÌM KIẾM =====================

// Generate property code: TYPE-DISTRICT-YYYYMMDD-XXXX
function genPropCode(type,loc,id){
  const typeMap={'Nhà phố':'NP','Căn hộ':'CH','Biệt thự':'BT','Nhà mặt tiền':'MT','Shophouse':'SH','Liền kề':'LK','Đất nền':'DN','Penthouse':'PH','Nhà riêng':'NR','Villa':'VL'};
  const locMap={'Quận 1':'Q1','Quận 2':'Q2','Quận 3':'Q3','Quận 4':'Q4','Quận 5':'Q5','Quận 6':'Q6','Quận 7':'Q7','Quận 8':'Q8','Quận 9':'Q9','Quận 10':'Q10','Quận 11':'Q11','Quận 12':'Q12','Bình Thạnh':'BTH','Tân Bình':'TB','Gò Vấp':'GV','Phú Nhuận':'PN','Tân Phú':'TPH','Bình Chánh':'BC','Nhà Bè':'NB','Hóc Môn':'HM','Thủ Đức':'TDU','TP. Thủ Đức':'TDU','Bình Dương':'BDU','Đồng Nai':'DNI'};
  const tc=typeMap[Object.keys(typeMap).find(k=>type.toLowerCase().includes(k.toLowerCase()))||'']||type.substring(0,2).toUpperCase();
  const lc=locMap[Object.keys(locMap).find(k=>loc.includes(k))||'']||(loc.replace(/[^A-Za-z0-9]/g,'').substring(0,3).toUpperCase()||'KV');
  const d=new Date(id);
  const ds=`${d.getFullYear()}${String(d.getMonth()+1).padStart(2,'0')}${String(d.getDate()).padStart(2,'0')}`;
  const seq=String(id).slice(-4);
  return`${tc}-${lc}-${ds}-${seq}`;
}

function saveCRM(){
  if(!VS.length)return toast('⚠️ Chưa có content!');
  const d=gfd();
  const existingCode=(document.getElementById('gen_code')?.value||'').trim();

  // Kiểm tra xem đang load từ CRM cũ không (trackerId trùng với id trong crm[])
  const existingIdx=trackerId?crm.findIndex(e=>e.id===trackerId):-1;

  if(existingIdx>=0){
    // ── CẬP NHẬT bản ghi cũ — KHÔNG tạo mới ──
    const old=crm[existingIdx];
    const code=existingCode||old.code||genPropCode(d.type,d.loc,old.id);
    crm[existingIdx]={
      ...old,           // giữ lại posted, postedTimes, postedNotes, note, id, time cũ
      code,
      type:d.type,
      loc:d.loc,
      price:d.price,
      area:d.area,
      pros:d.pros,
      vs:VS,
      updatedAt:new Date().toLocaleString('vi-VN')
    };
    fillCodeAll(code);
    saveSt();buildCRM();updStats();buildHomeRecent();
    toast(`✅ Đã cập nhật CRM! Mã căn: ${code}`);
  } else {
    // ── TẠO MỚI — lần đầu lưu ──
    const id=Date.now();
    const code=existingCode||genPropCode(d.type,d.loc,id);
    trackerId=id;
    crm.unshift({
      id,code,
      type:d.type,loc:d.loc,price:d.price,area:d.area,pros:d.pros,
      time:new Date().toLocaleString('vi-VN'),
      vs:VS,
      posted:{fb:false,zalo:false,tiktok:false,web:false},
      postedTimes:{},postedNotes:{},note:''
    });
    fillCodeAll(code);
    saveSt();buildCRM();updStats();buildHomeRecent();
    toast(`💾 Đã lưu CRM mới! Mã căn: ${code}`);
  }
}

// Filter state
let crmFilterState={q:'',type:'',status:'',sort:'newest'};

function filterCRM(){
  crmFilterState.q=(document.getElementById('crmSearch')?.value||'').toLowerCase().trim();
  crmFilterState.type=document.getElementById('crmFType')?.value||'';
  crmFilterState.status=document.getElementById('crmFStatus')?.value||'';
  crmFilterState.sort=document.getElementById('crmFSort')?.value||'newest';
  buildCRM();
}

function clearCRMFilter(){
  crmFilterState={q:'',type:'',status:'',sort:'newest'};
  const si=document.getElementById('crmSearch');if(si)si.value='';
  const ft=document.getElementById('crmFType');if(ft)ft.value='';
  const fs=document.getElementById('crmFStatus');if(fs)fs.value='';
  const fso=document.getElementById('crmFSort');if(fso)fso.value='newest';
  buildCRM();
}

function buildCRM(){
  const b=document.getElementById('crmBody');if(!b)return;

  // Apply filter + search
  let list=[...crm.map((e,i)=>({...e,_oi:i}))];

  // Search
  if(crmFilterState.q){
    const q=crmFilterState.q;
    list=list.filter(e=>(e.code||'').toLowerCase().includes(q)||(e.type||'').toLowerCase().includes(q)||(e.loc||'').toLowerCase().includes(q)||(e.price||'').toLowerCase().includes(q)||(e.pros||'').toLowerCase().includes(q)||(e.note||'').toLowerCase().includes(q));
  }
  // Type filter
  if(crmFilterState.type) list=list.filter(e=>(e.type||'').includes(crmFilterState.type));
  // Status filter
  if(crmFilterState.status){
    list=list.filter(e=>{
      const cnt=Object.values(e.posted||{}).filter(Boolean).length;
      if(crmFilterState.status==='new')return cnt===0;
      if(crmFilterState.status==='partial')return cnt>0&&cnt<4;
      if(crmFilterState.status==='full')return cnt===4;
      return true;
    });
  }
  // Sort
  if(crmFilterState.sort==='oldest')list.sort((a,b)=>a.id-b.id);
  else if(crmFilterState.sort==='code')list.sort((a,b)=>(a.code||'').localeCompare(b.code||''));
  else list.sort((a,b)=>b.id-a.id);

  // Update stats
  const fullCnt=crm.filter(e=>Object.values(e.posted||{}).filter(Boolean).length===4).length;
  const partCnt=crm.filter(e=>{const c=Object.values(e.posted||{}).filter(Boolean).length;return c>0&&c<4;}).length;
  const newCnt=crm.filter(e=>Object.values(e.posted||{}).filter(Boolean).length===0).length;
  const st=document.getElementById('crmStatTotal');if(st)st.textContent=`Tổng: ${crm.length}`;
  const sf=document.getElementById('crmStatFull');if(sf)sf.textContent=`✅ Đủ 4: ${fullCnt}`;
  const sp=document.getElementById('crmStatPartial');if(sp)sp.textContent=`⏳ Dở: ${partCnt}`;
  const sn=document.getElementById('crmStatNew');if(sn)sn.textContent=`🆕 Chưa: ${newCnt}`;

  // Empty state
  const em=document.getElementById('crmEmpty');
  if(!crm.length){b.innerHTML='<tr><td colspan="7" style="text-align:center;color:var(--t3);padding:28px;font-size:.79rem">Chưa có dữ liệu.<br>Tạo content và bấm "Lưu CRM" để lưu.</td></tr>';if(em)em.style.display='none';}
  else if(!list.length){b.innerHTML='';if(em)em.style.display='block';}
  else{
    if(em)em.style.display='none';
    b.innerHTML=list.map((e,ri)=>{
      const p=e.posted||{};
      const chips=['fb','zalo','tiktok','web'].map(k=>{
        const lbl={fb:'FB',zalo:'ZL',tiktok:'TT',web:'WB'}[k];
        return p[k]
          ?`<span style="font-size:.55rem;padding:1px 5px;border-radius:5px;background:rgba(62,207,142,.18);color:var(--gr);font-weight:700">${lbl}</span>`
          :`<span style="font-size:.55rem;padding:1px 5px;border-radius:5px;background:var(--bg3);color:var(--t3)">${lbl}</span>`;
      }).join('');
      const postedCount=Object.values(p).filter(Boolean).length;
      const statusDot=postedCount===4?'var(--gr)':postedCount>0?'var(--ac)':'var(--border)';
      const oi=e._oi; // original index in crm[]
      // Highlight search match
      const q=crmFilterState.q;
      const hl=s=>q&&s&&s.toLowerCase().includes(q)?`<mark style="background:rgba(245,166,35,.35);border-radius:2px">${s}</mark>`:s;
      return`<tr>
        <td>
          <div style="font-family:'Space Mono',monospace;font-size:.67rem;font-weight:700;color:var(--ac);white-space:nowrap">${hl(e.code||'—')}</div>
          <div style="width:6px;height:6px;border-radius:50%;background:${statusDot};display:inline-block;margin-top:3px" title="${postedCount}/4 nền tảng"></div>
        </td>
        <td><strong style="color:var(--tx);font-size:.77rem">${hl(e.type)}</strong></td>
        <td style="font-size:.75rem">${hl(e.loc)}</td>
        <td style="color:var(--ac);font-weight:700;font-size:.76rem;white-space:nowrap">${hl(e.price)}</td>
        <td>
          <div style="display:flex;gap:3px;flex-wrap:wrap">${chips}</div>
          <div style="font-size:.58rem;color:var(--t3);margin-top:2px">${postedCount}/4</div>
        </td>
        <td style="color:var(--t3);font-size:.68rem;white-space:nowrap">${e.time}</td>
        <td>
          <div style="display:flex;gap:4px;flex-wrap:wrap">
            <button class="btn btn-xs btn-s" onclick="loadCRM(${oi})" title="Load content">📂</button>
            <button class="btn btn-xs btn-b" onclick="openCRMDetail(${oi})" title="Xem chi tiết">🔍</button>
            <button class="btn btn-xs btn-r" onclick="delCRM(${oi})" title="Xóa">🗑️</button>
          </div>
        </td>
      </tr>`;
    }).join('');
  }
  const bd=document.getElementById('crmbdg');if(bd)bd.textContent=crm.length;
}

function openCRMDetail(i){
  const e=crm[i];if(!e)return;
  const p=e.posted||{};
  const plt=[{k:'fb',ic:'📘',nm:'Facebook'},{k:'zalo',ic:'💬',nm:'Zalo'},{k:'tiktok',ic:'🎵',nm:'TikTok'},{k:'web',ic:'🌐',nm:'Website'}];
  document.getElementById('crmDetailTitle').textContent=`${e.type} — ${e.loc}`;
  document.getElementById('crmDetailCode').textContent=`Mã căn: ${e.code||'—'}`;
  document.getElementById('crmDetailBody').innerHTML=`
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:13px">
      <div style="background:var(--bg3);border-radius:8px;padding:9px"><div style="font-size:.63rem;color:var(--t3);margin-bottom:2px">Loại nhà</div><div style="font-weight:700;font-size:.82rem">${e.type}</div></div>
      <div style="background:var(--bg3);border-radius:8px;padding:9px"><div style="font-size:.63rem;color:var(--t3);margin-bottom:2px">Giá</div><div style="font-weight:700;font-size:.82rem;color:var(--ac)">${e.price}</div></div>
      <div style="background:var(--bg3);border-radius:8px;padding:9px"><div style="font-size:.63rem;color:var(--t3);margin-bottom:2px">Khu vực</div><div style="font-weight:700;font-size:.82rem">${e.loc}</div></div>
      <div style="background:var(--bg3);border-radius:8px;padding:9px"><div style="font-size:.63rem;color:var(--t3);margin-bottom:2px">Diện tích</div><div style="font-weight:700;font-size:.82rem">${e.area||'—'}</div></div>
    </div>
    <div style="margin-bottom:12px">
      <div style="font-size:.71rem;font-weight:700;color:var(--tx);margin-bottom:5px">🔢 Mã căn</div>
      <div style="display:flex;gap:7px;align-items:center">
        <input type="text" id="crmDetailCodeEdit" value="${e.code||''}" style="font-family:'Space Mono',monospace;font-size:.82rem;font-weight:700;color:var(--ac);flex:1;padding:5px 10px">
        <button class="btn btn-s btn-xs" onclick="saveCRMCode(${i})">💾 Lưu mã</button>
        <button class="btn btn-xs" style="background:rgba(245,166,35,.12);color:var(--ac);border:1px solid rgba(245,166,35,.3)" onclick="cpTxt(document.getElementById('crmDetailCodeEdit').value)">📋</button>
      </div>
    </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
        ${plt.map(pl=>`<div style="background:${p[pl.k]?'rgba(62,207,142,.1)':'var(--bg3)'};border:1px solid ${p[pl.k]?'rgba(62,207,142,.4)':'var(--border)'};border-radius:8px;padding:8px 10px;display:flex;align-items:center;gap:7px">
          <span>${pl.ic}</span>
          <div style="flex:1">
            <div style="font-size:.73rem;font-weight:600;color:var(--tx)">${pl.nm}</div>
            <div style="font-size:.63rem;color:${p[pl.k]?'var(--gr)':'var(--t3)'}">${p[pl.k]?'✅ Đã đăng '+(e.postedTimes?.[pl.k]||''):'Chưa đăng'}</div>
            ${(e.postedNotes?.[pl.k])?`<div style="font-size:.62rem;color:var(--bl);margin-top:2px">🔗 ${e.postedNotes[pl.k]}</div>`:''}
          </div>
        </div>`).join('')}
      </div>
    </div>
    ${e.pros?`<div style="margin-bottom:10px"><div style="font-size:.71rem;font-weight:700;color:var(--tx);margin-bottom:5px">⭐ Điểm mạnh</div><div style="font-size:.76rem;color:var(--t2);background:var(--bg3);border-radius:8px;padding:9px;line-height:1.7">${e.pros}</div></div>`:''}
    <div style="margin-bottom:10px">
      <div style="font-size:.71rem;font-weight:700;color:var(--tx);margin-bottom:5px">📝 Ghi chú nội bộ</div>
      <textarea id="crmDetailNote" style="min-height:60px;font-size:.76rem" placeholder="Ghi chú: tình trạng, phản hồi KH, lý do chưa đăng...">${e.note||''}</textarea>
    </div>
    <div style="font-size:.67rem;color:var(--t3);margin-bottom:12px">🕐 Lưu lúc: ${e.time}</div>
    <div style="display:flex;gap:7px;flex-wrap:wrap">
      <button class="btn btn-p btn-sm" onclick="saveCRMNote(${i})">💾 Lưu ghi chú</button>
      <button class="btn btn-s btn-sm" onclick="loadCRM(${i});document.getElementById('crmDetailModal').classList.remove('on')">📂 Load content</button>
      <button class="btn btn-s btn-sm" onclick="cpTxt('${e.code||''}')">📋 Copy mã căn</button>
      <button class="btn btn-r btn-sm" onclick="delCRM(${i});document.getElementById('crmDetailModal').classList.remove('on')">🗑️ Xóa</button>
    </div>`;
  document.getElementById('crmDetailModal').classList.add('on');
}

function saveCRMNote(i){
  const n=document.getElementById('crmDetailNote')?.value||'';
  crm[i].note=n;saveSt();buildCRM();toast('💾 Đã lưu ghi chú!');
}

function saveCRMCode(i){
  const newCode=(document.getElementById('crmDetailCodeEdit')?.value||'').trim();
  if(!newCode)return toast('⚠️ Mã căn không được để trống!');
  crm[i].code=newCode;saveSt();buildCRM();
  // Cập nhật header modal
  const dc=document.getElementById('crmDetailCode');if(dc)dc.textContent=`Mã căn: ${newCode}`;
  toast(`✅ Đã cập nhật mã căn: ${newCode}`);
}

function loadCRM(i){
  const e=crm[i];
  ['type','price','area','loc','pros'].forEach(k=>{const el=document.getElementById('i_'+k);if(el)el.value=e[k]||'';});
  VS=e.vs||[];VI=0;
  trackerId=e.id||0;
  trackerState=e.posted?JSON.parse(JSON.stringify(e.posted)):{fb:false,zalo:false,tiktok:false,web:false};
  trackerTimes=e.postedTimes?JSON.parse(JSON.stringify(e.postedTimes)):{fb:'',zalo:'',tiktok:'',web:''};
  trackerNotes=e.postedNotes?JSON.parse(JSON.stringify(e.postedNotes)):{fb:'',zalo:'',tiktok:'',web:''};
  if(e.code)fillCodeAll(e.code);
  nav('gen');
  updCRMEditBanner(e);
  if(VS.length){
    document.getElementById('outArea').classList.add('on');
    document.getElementById('vTabsRow').classList.toggle('hidden',VS.length<=1);
    if(VS.length>1){
      const lb=['💰 THAM','🔥 SÂN','🤔 SI','👑 NGẠO','🔍 NGHI NGỜ'];
      document.getElementById('vTabs').innerHTML=VS.map((x,j)=>`<div class="vtab${j===0?' on':''}" data-v="${j}" onclick="sVer(this,${j})">${lb[j]||'V'+(j+1)}</div>`).join('');
    }
    renderPlt();renderTracker();
  }
  toast(`📂 Đã load! Tick nền tảng rồi bấm "💾 Cập nhật CRM"`);
}

function updCRMEditBanner(e){
  let banner=document.getElementById('crmEditBanner');
  if(!banner){
    banner=document.createElement('div');
    banner.id='crmEditBanner';
    banner.style.cssText='background:linear-gradient(135deg,rgba(76,156,245,.15),rgba(76,156,245,.05));border:1.5px solid rgba(76,156,245,.4);border-radius:11px;padding:10px 14px;margin-bottom:11px;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;display:none';
    const pg=document.getElementById('pg-gen');
    const firstCard=pg?pg.querySelector('.card'):null;
    if(firstCard)firstCard.before(banner);
  }
  if(e){
    banner.style.display='flex';
    banner.innerHTML=`<div style="display:flex;align-items:center;gap:9px;flex:1"><span style="font-size:1.2rem">✏️</span><div><div style="font-weight:800;font-size:.82rem;color:var(--bl)">Đang chỉnh sửa — bấm "Cập nhật CRM" để lưu, KHÔNG tạo thêm bản ghi mới</div><div style="font-size:.7rem;color:var(--t2);margin-top:2px"><span style="font-family:'Space Mono',monospace;color:var(--ac)">${e.code||'—'}</span> · ${e.type||''} · ${e.loc||''} · ${e.price||''}</div></div></div><div style="display:flex;gap:6px;flex-shrink:0"><button class="btn btn-b btn-sm" onclick="saveCRM()">💾 Cập nhật CRM</button><button class="btn btn-r btn-sm" onclick="resetCRMEditMode()">✕ Tạo tin mới</button></div>`;
  } else {
    banner.style.display='none';
  }
}

function resetCRMEditMode(){
  trackerId=0;
  const banner=document.getElementById('crmEditBanner');
  if(banner)banner.style.display='none';
  toast('✅ Chế độ tạo tin mới — Lưu CRM sẽ tạo bản ghi mới');
}


// Migrate old CRM entries (add code if missing)
function migrateCRM(){
  crm.forEach(e=>{if(!e.code)e.code=genPropCode(e.type||'NP',e.loc||'KV',e.id||Date.now());if(!e.note)e.note='';});
}

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

// ===================== HANDBOOK — 3 EBOOKS =====================
let hbActive=0;

function buildHBExtra(){
  buildHBModules();
  // Ensure correct book is shown
  switchHBBook(hbActive);
}

function switchHBBook(n){
  hbActive=n;
  [0,1,2].forEach(i=>{
    const book=document.getElementById('hbbook_'+i);
    if(book)book.style.display=i===n?'block':'none';
    const card=document.getElementById('hbcard_'+i);
    if(!card)return;
    if(i===n){
      const colors=['rgba(245,166,35,.15)','rgba(239,83,80,.12)','rgba(76,156,245,.12)'];
      const borders=['var(--ac)','var(--rd)','var(--bl)'];
      const labels=['📖 Đang xem','📖 Đang xem','📖 Đang xem'];
      const labelColors=['var(--ac)','var(--rd)','var(--bl)'];
      card.style.background=`linear-gradient(135deg,${colors[i]},transparent)`;
      card.style.border=`2px solid ${borders[i]}`;
      const badge=card.querySelector('div:last-child');
      if(badge){badge.textContent=labels[i];badge.style.color=labelColors[i];}
    } else {
      card.style.background='var(--card)';
      card.style.border='1px solid var(--border)';
      const badge=card.querySelector('div:last-child');
      if(badge){badge.textContent='👆 Bấm để xem';badge.style.color='var(--t3)';}
    }
  });
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
  // Reminder badge
  const rmBadge=document.getElementById('rmBadge');
  const dueCount=reminders.filter(r=>!r.done&&new Date(r.datetime)<=new Date()).length;
  if(rmBadge){rmBadge.textContent=dueCount;rmBadge.style.display=dueCount>0?'flex':'none';}
  // Sidebar badge for KH labels hot count
  const rmSide=document.getElementById('rmSideCount');
  if(rmSide){const hotCount=khList.filter(k=>k.label==='hot').length;rmSide.textContent=hotCount;rmSide.style.display=hotCount>0?'':'none';}
  updCKBadge();
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


// ===================== DASHBOARD + XUẤT BÁO CÁO =====================
function buildDashboard(){
  const el=document.getElementById('dashboardContent');if(!el)return;
  try{
    const now=new Date();
    const thisWeek=getWeekNumber(now);
    const thisMonth=now.getMonth()+1;
    const thisYear=now.getFullYear();
    const mNames=['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];
    const monthName=mNames[now.getMonth()];
    const totalContent=contentLog.length;
    const thisWeekContent=contentLog.filter(c=>c.week===thisWeek&&c.year===thisYear).length;
    const thisMonthContent=contentLog.filter(c=>c.month===thisMonth&&c.year===thisYear).length;
    const lastMonthContent=contentLog.filter(c=>c.month===(thisMonth===1?12:thisMonth-1)&&c.year===(thisMonth===1?thisYear-1:thisYear)).length;
    const growthPct=lastMonthContent?Math.round(((thisMonthContent-lastMonthContent)/lastMonthContent)*100):0;
    const dueReminders=reminders.filter(r=>!r.done&&new Date(r.datetime)<=now).length;
    const doneReminders=reminders.filter(r=>r.done).length;
    const totalReminders=reminders.length;
    const hotKH=(khList||[]).filter(k=>k.label==='hot').length;
    const warmKH=(khList||[]).filter(k=>k.label==='warm').length;
    const doneKH=(khList||[]).filter(k=>k.label==='done').length;
    const sc6Posted=Object.values((sc6Data&&sc6Data.posted)||{}).filter(Boolean).length;
    const sc6Total=(sc6Data&&sc6Data.schedule)?sc6Data.schedule.length:0;
    const sc6Filled=(sc6Data&&sc6Data.slots)?sc6Data.slots.filter(s=>s.filled).length:0;

    // Last 7 days
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
      const wn=thisWeek-i;
      const count=contentLog.filter(c=>c.week===wn&&c.year===thisYear).length;
      last4weeks.push({week:`T${wn}`,count});
    }
    const maxWeek=Math.max(...last4weeks.map(w=>w.count),1);

    // Platform posted stats
    const ps={fb:0,zalo:0,tiktok:0,web:0};
    crm.forEach(e=>{if(e.posted){['fb','zalo','tiktok','web'].forEach(k=>{if(e.posted[k])ps[k]++;});}});
    const totalPosted=Object.values(ps).reduce((a,b)=>a+b,0);

    // Top types
    const byType={};
    crm.forEach(c=>{byType[c.type]=(byType[c.type]||0)+1;});
    const topTypes=Object.entries(byType).sort((a,b)=>b[1]-a[1]).slice(0,5);

    el.innerHTML=`
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px">
        <div style="background:linear-gradient(135deg,rgba(245,166,35,.15),rgba(245,166,35,.05));border:1px solid rgba(245,166,35,.3);border-radius:12px;padding:14px;text-align:center">
          <div style="font-size:2rem;font-weight:900;color:var(--ac);font-family:'Space Mono',monospace">${totalContent}</div>
          <div style="font-size:.68rem;color:var(--t3);margin-top:3px">Tổng content</div>
        </div>
        <div style="background:linear-gradient(135deg,rgba(62,207,142,.15),rgba(62,207,142,.05));border:1px solid rgba(62,207,142,.3);border-radius:12px;padding:14px;text-align:center">
          <div style="font-size:2rem;font-weight:900;color:var(--gr);font-family:'Space Mono',monospace">${thisMonthContent}</div>
          <div style="font-size:.68rem;color:var(--t3);margin-top:3px">${monthName} ${growthPct!==0?`<span style="color:${growthPct>0?'var(--gr)':'var(--rd)'}">(${growthPct>0?'+':''}${growthPct}%)</span>`:''}</div>
        </div>
        <div style="background:linear-gradient(135deg,rgba(76,156,245,.15),rgba(76,156,245,.05));border:1px solid rgba(76,156,245,.3);border-radius:12px;padding:14px;text-align:center">
          <div style="font-size:2rem;font-weight:900;color:var(--bl);font-family:'Space Mono',monospace">${thisWeekContent}</div>
          <div style="font-size:.68rem;color:var(--t3);margin-top:3px">Tuần này</div>
        </div>
        <div style="background:linear-gradient(135deg,rgba(239,83,80,.15),rgba(239,83,80,.05));border:1px solid rgba(239,83,80,.3);border-radius:12px;padding:14px;text-align:center">
          <div style="font-size:2rem;font-weight:900;color:var(--rd);font-family:'Space Mono',monospace">${dueReminders}</div>
          <div style="font-size:.68rem;color:var(--t3);margin-top:3px">Nhắc đến hạn</div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:11px;margin-bottom:12px">
        <div class="card">
          <div class="ctit"><span class="dot"></span>📈 Content 7 ngày qua</div>
          <div style="display:flex;align-items:flex-end;gap:5px;height:90px;padding:0 2px">
            ${last7.map(d=>`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px">
              <div style="font-size:.58rem;color:var(--t3)">${d.count||''}</div>
              <div style="width:100%;background:${d.count>0?'linear-gradient(180deg,var(--ac),var(--a2))':'var(--bg3)'};border-radius:4px 4px 0 0;height:${Math.max(3,Math.round((d.count/maxDay)*66))}px;transition:.3s" title="${d.date}:${d.count}"></div>
              <div style="font-size:.58rem;color:var(--t3)">${d.day}</div>
            </div>`).join('')}
          </div>
        </div>
        <div class="card">
          <div class="ctit"><span class="dot"></span>📊 4 tuần qua</div>
          <div style="display:flex;align-items:flex-end;gap:8px;height:90px;padding:0 2px">
            ${last4weeks.map(w=>`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:3px">
              <div style="font-size:.58rem;color:var(--t3)">${w.count||''}</div>
              <div style="width:100%;background:${w.count>0?'linear-gradient(180deg,var(--bl),#2979e0)':'var(--bg3)'};border-radius:4px 4px 0 0;height:${Math.max(3,Math.round((w.count/maxWeek)*66))}px;transition:.3s"></div>
              <div style="font-size:.58rem;color:var(--t3)">${w.week}</div>
            </div>`).join('')}
          </div>
        </div>
      </div>

      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:11px;margin-bottom:12px">
        <div class="card">
          <div class="ctit"><span class="dot"></span>🎯 Trạng thái KH</div>
          <div style="display:grid;gap:5px;font-size:.76rem">
            <div style="display:flex;justify-content:space-between;padding:5px 8px;background:rgba(239,83,80,.08);border-radius:7px"><span>🔴 Nóng</span><strong style="color:var(--rd)">${hotKH}</strong></div>
            <div style="display:flex;justify-content:space-between;padding:5px 8px;background:rgba(245,166,35,.08);border-radius:7px"><span>🟡 Ấm</span><strong style="color:var(--ac)">${warmKH}</strong></div>
            <div style="display:flex;justify-content:space-between;padding:5px 8px;background:rgba(62,207,142,.08);border-radius:7px"><span>✅ Chốt</span><strong style="color:var(--gr)">${doneKH}</strong></div>
          </div>
          <button class="btn btn-s btn-xs" style="margin-top:8px;width:100%;justify-content:center" onclick="nav('khlabels')">Xem KH →</button>
        </div>
        <div class="card">
          <div class="ctit"><span class="dot"></span>⏰ Nhắc Lịch</div>
          <div style="display:grid;gap:5px;font-size:.76rem">
            <div style="display:flex;justify-content:space-between;padding:5px 8px;background:rgba(239,83,80,.08);border-radius:7px"><span>🔴 Đến hạn</span><strong style="color:var(--rd)">${dueReminders}</strong></div>
            <div style="display:flex;justify-content:space-between;padding:5px 8px;background:rgba(62,207,142,.08);border-radius:7px"><span>✅ Xong</span><strong style="color:var(--gr)">${doneReminders}</strong></div>
            <div style="display:flex;justify-content:space-between;padding:5px 8px;background:var(--bg3);border-radius:7px"><span>⏳ Sắp tới</span><strong style="color:var(--t2)">${totalReminders-dueReminders-doneReminders}</strong></div>
          </div>
          <button class="btn btn-s btn-xs" style="margin-top:8px;width:100%;justify-content:center" onclick="nav('reminder')">Xem lịch →</button>
        </div>
        <div class="card">
          <div class="ctit"><span class="dot"></span>🏘️ Chiến Thuật 6 Căn</div>
          <div style="display:grid;gap:5px;font-size:.76rem">
            <div style="display:flex;justify-content:space-between;padding:5px 8px;background:rgba(245,166,35,.08);border-radius:7px"><span>🏠 Căn đã nhập</span><strong style="color:var(--ac)">${sc6Filled}/6</strong></div>
            <div style="display:flex;justify-content:space-between;padding:5px 8px;background:rgba(76,156,245,.08);border-radius:7px"><span>📅 Lịch</span><strong style="color:var(--bl)">${sc6Total} content</strong></div>
            <div style="display:flex;justify-content:space-between;padding:5px 8px;background:rgba(62,207,142,.08);border-radius:7px"><span>✅ Đã đăng</span><strong style="color:var(--gr)">${sc6Posted}</strong></div>
          </div>
          <button class="btn btn-s btn-xs" style="margin-top:8px;width:100%;justify-content:center" onclick="nav('sixcan')">Xem chiến dịch →</button>
        </div>
      </div>

      ${crm.length?`<div class="card" style="margin-bottom:12px">
        <div class="ctit"><span class="dot"></span>📌 Đăng tin theo nền tảng</div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-bottom:9px">
          ${[{k:'fb',ic:'📘',nm:'Facebook'},{k:'zalo',ic:'💬',nm:'Zalo'},{k:'tiktok',ic:'🎵',nm:'TikTok'},{k:'web',ic:'🌐',nm:'Website'}].map(p=>`<div style="background:${ps[p.k]>0?'rgba(62,207,142,.1)':'var(--bg3)'};border:1px solid ${ps[p.k]>0?'rgba(62,207,142,.35)':'var(--border)'};border-radius:9px;padding:10px 7px;text-align:center">
            <div style="font-size:1.3rem">${p.ic}</div>
            <div style="font-weight:900;font-size:1.2rem;color:${ps[p.k]>0?'var(--gr)':'var(--t3)'};font-family:'Space Mono',monospace">${ps[p.k]}</div>
            <div style="font-size:.62rem;color:var(--t3)">${p.nm}</div>
          </div>`).join('')}
        </div>
        <div style="display:flex;justify-content:space-between;font-size:.72rem;color:var(--t2)">
          <span>Tổng lượt đăng: <strong style="color:var(--ac)">${totalPosted}</strong></span>
          <span>Phủ sóng: <strong style="color:var(--gr)">${Math.round(totalPosted/Math.max(crm.length,1)/4*100)}%</strong></span>
        </div>
      </div>`:''}

      ${topTypes.length?`<div class="card" style="margin-bottom:12px">
        <div class="ctit"><span class="dot"></span>🏠 Loại nhà hay đăng nhất</div>
        ${topTypes.map(([t,c])=>`<div style="display:flex;align-items:center;gap:8px;margin-bottom:7px">
          <div style="font-size:.75rem;color:var(--t2);width:110px;flex-shrink:0">${t}</div>
          <div style="flex:1;height:8px;background:var(--bg3);border-radius:4px;overflow:hidden">
            <div style="height:100%;background:linear-gradient(90deg,var(--ac),var(--a2));border-radius:4px;width:${Math.round((c/topTypes[0][1])*100)}%"></div>
          </div>
          <div style="font-size:.7rem;font-weight:700;color:var(--ac);width:22px;text-align:right">${c}</div>
        </div>`).join('')}
      </div>`:''}

      <div style="text-align:center;padding:10px 0;font-size:.68rem;color:var(--t3)">
        📅 Cập nhật: ${now.toLocaleString('vi-VN')} · <span style="cursor:pointer;color:var(--ac)" onclick="buildDashboard()">🔄 Refresh</span>
      </div>`;
  }catch(err){
    el.innerHTML=`<div style="text-align:center;padding:32px;color:var(--t3)"><div style="font-size:1.5rem;margin-bottom:9px">⚠️</div><div style="font-size:.82rem;margin-bottom:9px">Lỗi tải dashboard. Thử refresh.</div><button class="btn btn-s btn-sm" onclick="buildDashboard()">🔄 Thử lại</button></div>`;
    console.error('buildDashboard error:',err);
  }
}

function buildReportData(){
  const now=new Date();
  const mNames=['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'];
  const thisMonth=now.getMonth()+1;const thisYear=now.getFullYear();
  const monthName=mNames[now.getMonth()];
  const thisWeek=getWeekNumber(now);
  const totalContent=contentLog.length;
  const thisMonthContent=contentLog.filter(c=>c.month===thisMonth&&c.year===thisYear).length;
  const lastMonthContent=contentLog.filter(c=>c.month===(thisMonth===1?12:thisMonth-1)&&c.year===(thisMonth===1?thisYear-1:thisYear)).length;
  const thisWeekContent=contentLog.filter(c=>c.week===thisWeek&&c.year===thisYear).length;
  const growthPct=lastMonthContent?Math.round(((thisMonthContent-lastMonthContent)/lastMonthContent)*100):0;
  const ps={fb:0,zalo:0,tiktok:0,web:0};
  crm.forEach(e=>{if(e.posted){['fb','zalo','tiktok','web'].forEach(k=>{if(e.posted[k])ps[k]++;});}});
  const totalPosted=Object.values(ps).reduce((a,b)=>a+b,0);
  const hotKH=(khList||[]).filter(k=>k.label==='hot').length;
  const warmKH=(khList||[]).filter(k=>k.label==='warm').length;
  const doneKH=(khList||[]).filter(k=>k.label==='done').length;
  const dueRem=reminders.filter(r=>!r.done&&new Date(r.datetime)<=now).length;
  const doneRem=reminders.filter(r=>r.done).length;
  const sc6Posted=Object.values((sc6Data&&sc6Data.posted)||{}).filter(Boolean).length;
  const sc6Total=(sc6Data&&sc6Data.schedule)?sc6Data.schedule.length:0;
  const recentCRM=crm.slice(0,5);
  return{now,monthName,thisYear,thisMonth,totalContent,thisMonthContent,lastMonthContent,thisWeekContent,growthPct,ps,totalPosted,hotKH,warmKH,doneKH,dueRem,doneRem,sc6Posted,sc6Total,recentCRM};
}

function exportReportTxt(){
  const d=buildReportData();
  // Lấy thông tin từ Hồ Sơ
  const myName=prof.name||'[Chưa điền Hồ Sơ]';
  const myTitle=prof.title||'Môi giới BĐS';
  const myPhone=prof.phone||'[SĐT]';
  const myZalo=prof.zalo||prof.phone||'[Zalo]';
  const line='='.repeat(50);
  let txt=`📊 BÁO CÁO HOẠT ĐỘNG ${d.monthName.toUpperCase()}/${d.thisYear}\n${line}\n`;
  txt+=`👤 Họ tên:    ${myName}\n`;
  txt+=`🏢 Chức danh: ${myTitle}\n`;
  txt+=`📞 SĐT:       ${myPhone}\n`;
  txt+=`💬 Zalo:      ${myZalo}\n`;
  txt+=`📅 Ngày xuất: ${d.now.toLocaleString('vi-VN')}\n${line}\n\n`;
  txt+=`📝 CONTENT & ĐĂNG TIN\n${'─'.repeat(36)}\n`;
  txt+=`• Tổng content đã tạo:   ${d.totalContent}\n`;
  txt+=`• ${d.monthName} này:           ${d.thisMonthContent}${d.growthPct!==0?` (${d.growthPct>0?'+':''}${d.growthPct}% vs tháng trước)`:''}\n`;
  txt+=`• Tuần này:              ${d.thisWeekContent}\n`;
  txt+=`• Đã đăng Facebook:      ${d.ps.fb}\n`;
  txt+=`• Đã đăng Zalo:          ${d.ps.zalo}\n`;
  txt+=`• Đã đăng TikTok:        ${d.ps.tiktok}\n`;
  txt+=`• Đã đăng Website:       ${d.ps.web}\n`;
  txt+=`• Tổng lượt đăng:        ${d.totalPosted}\n\n`;
  txt+=`🎯 KHÁCH HÀNG\n${'─'.repeat(36)}\n`;
  txt+=`• KH Nóng (follow gấp): ${d.hotKH}\n• KH Ấm (cân nhắc):     ${d.warmKH}\n• Đã chốt deal:          ${d.doneKH}\n`;
  txt+=`• Nhắc đến hạn:          ${d.dueRem}\n• Follow-up xong:        ${d.doneRem}\n\n`;
  txt+=`🏘️ CHIẾN THUẬT 6 CĂN\n${'─'.repeat(36)}\n`;
  txt+=`• Lịch 30 ngày: ${d.sc6Total} content · Đã đăng: ${d.sc6Posted}\n`;
  txt+=`• Tiến độ: ${d.sc6Total?Math.round(d.sc6Posted/d.sc6Total*100):0}%\n\n`;
  txt+=`🗄️ CRM — 5 TIN GẦN NHẤT\n${'─'.repeat(36)}\n`;
  d.recentCRM.forEach((e,i)=>{const pc=Object.values(e.posted||{}).filter(Boolean).length;txt+=`${i+1}. [${e.code||'—'}] ${e.type} — ${e.loc} — ${e.price} (${pc}/4 nền tảng)\n`;});
  txt+=`\n${line}\n${myName} — ${myTitle} | 📞 ${myPhone}\n#aihockiemtien · AUTO PRO CONTENT BĐS v7\n`;
  if(!prof.name)toast('⚠️ Chưa điền Hồ Sơ — báo cáo thiếu thông tin cá nhân!');
  dlTxt(txt,`bao-cao-${d.monthName.replace(' ','-')}-${d.thisYear}.txt`);
  toast('📄 Đã xuất báo cáo .txt!');
}

function exportReportHTML(){
  const d=buildReportData();
  const myName=prof.name||'[Chưa điền Hồ Sơ]';
  const myTitle=prof.title||'Môi giới BĐS';
  const myPhone=prof.phone||'[SĐT]';
  const myZalo=prof.zalo||prof.phone||'[Zalo]';
  const av=prof.avatar
    ?`<img src="${prof.avatar}" style="width:52px;height:52px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,.4)">`
    :`<div style="width:52px;height:52px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:1.5rem">👤</div>`;
  const html=`<!DOCTYPE html><html lang="vi"><head><meta charset="UTF-8"><title>Báo cáo ${d.monthName}/${d.thisYear} — ${myName}</title>
<style>*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Segoe UI',Arial,sans-serif;background:#f4f6fb;color:#1a1e2e;padding:20px}.w{max-width:660px;margin:0 auto}
.hdr{background:linear-gradient(135deg,#f5a623,#e8891a);border-radius:12px;padding:18px 20px;color:#fff;display:flex;align-items:center;gap:14px;margin-bottom:16px}
.hdr-info h1{font-size:1.15rem;font-weight:700;margin-bottom:3px}.hdr-info .sub{font-size:.76rem;opacity:.85;margin-bottom:2px}.hdr-info .contact{font-size:.72rem;opacity:.75}
.gr{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin-bottom:14px}
.sc{background:#fff;border-radius:10px;padding:12px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,.06)}.sc-n{font-size:1.7rem;font-weight:700;font-family:'Courier New',monospace}.sc-l{font-size:.64rem;color:#6b7490;margin-top:2px}
.sec{background:#fff;border-radius:10px;padding:14px;margin-bottom:12px;box-shadow:0 2px 8px rgba(0,0,0,.06)}.sec h3{font-size:.86rem;font-weight:700;margin-bottom:10px;padding-bottom:7px;border-bottom:1px solid #eee}
.row{display:flex;justify-content:space-between;padding:5px 0;font-size:.8rem;border-bottom:1px solid #f4f6fb}.row:last-child{border-bottom:none}
.v{font-weight:700;color:#f5a623}.v.g{color:#3ecf8e}.v.b{color:#4c9cf5}.v.r{color:#ef5350}
.plts{display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-top:8px}.plt{background:#f4f6fb;border-radius:7px;padding:9px;text-align:center}
.plt-n{font-weight:700;font-size:1.1rem;color:#3ecf8e;font-family:'Courier New',monospace}.plt-l{font-size:.62rem;color:#6b7490}
.ci{padding:6px 0;border-bottom:1px solid #f4f6fb;font-size:.78rem}.code{font-family:'Courier New',monospace;font-size:.68rem;color:#f5a623;background:#fff8ec;padding:1px 5px;border-radius:4px}
.foot{text-align:center;padding:14px;font-size:.7rem;color:#8890a8;border-top:1px solid #e8eaf4;margin-top:4px}
${prof.name?'':'.warn{background:#fff3cd;border:1px solid #ffc107;border-radius:8px;padding:10px 13px;margin-bottom:12px;font-size:.78rem;color:#856404}'}
@media print{body{background:#fff;padding:0}.w{max-width:100%}}</style></head>
<body><div class="w">
${!prof.name?'<div class="warn">⚠️ Chưa điền Hồ Sơ — Vào mục Hồ Sơ để thêm thông tin cá nhân cho báo cáo chuyên nghiệp hơn.</div>':''}
<div class="hdr">${av}<div class="hdr-info"><h1>📊 Báo cáo ${d.monthName}/${d.thisYear}</h1><div class="sub">${myName} — ${myTitle}</div><div class="contact">📞 ${myPhone} | 💬 Zalo: ${myZalo}</div><div class="contact" style="margin-top:2px">🕐 ${d.now.toLocaleString('vi-VN')}</div></div></div>
<div class="gr">
<div class="sc"><div class="sc-n" style="color:#f5a623">${d.totalContent}</div><div class="sc-l">Tổng content</div></div>
<div class="sc"><div class="sc-n" style="color:#3ecf8e">${d.thisMonthContent}</div><div class="sc-l">${d.monthName}${d.growthPct!==0?` ${d.growthPct>0?'↑':'↓'}${Math.abs(d.growthPct)}%`:''}</div></div>
<div class="sc"><div class="sc-n" style="color:#4c9cf5">${d.thisWeekContent}</div><div class="sc-l">Tuần này</div></div>
<div class="sc"><div class="sc-n" style="color:#ef5350">${d.dueRem}</div><div class="sc-l">Nhắc đến hạn</div></div>
</div>
<div class="sec"><h3>📌 Đăng tin theo nền tảng</h3>
<div class="plts"><div class="plt"><div>📘</div><div class="plt-n">${d.ps.fb}</div><div class="plt-l">Facebook</div></div><div class="plt"><div>💬</div><div class="plt-n">${d.ps.zalo}</div><div class="plt-l">Zalo</div></div><div class="plt"><div>🎵</div><div class="plt-n">${d.ps.tiktok}</div><div class="plt-l">TikTok</div></div><div class="plt"><div>🌐</div><div class="plt-n">${d.ps.web}</div><div class="plt-l">Website</div></div></div>
<div class="row" style="margin-top:9px"><span>Tổng lượt đăng</span><span class="v">${d.totalPosted}</span></div>
<div class="row"><span>Tỷ lệ phủ sóng</span><span class="v g">${Math.round(d.totalPosted/Math.max(crm.length,1)/4*100)}%</span></div></div>
<div class="sec"><h3>🎯 Trạng thái Khách Hàng</h3>
<div class="row"><span>🔴 KH Nóng — cần follow gấp</span><span class="v r">${d.hotKH}</span></div>
<div class="row"><span>🟡 KH Ấm — đang cân nhắc</span><span class="v">${d.warmKH}</span></div>
<div class="row"><span>✅ Đã chốt deal</span><span class="v g">${d.doneKH}</span></div>
<div class="row"><span>⏰ Follow-up đã xong</span><span class="v g">${d.doneRem}</span></div></div>
<div class="sec"><h3>🏘️ Chiến Thuật 6 Căn</h3>
<div class="row"><span>Lịch 30 ngày</span><span class="v">${d.sc6Total} content</span></div>
<div class="row"><span>Đã đăng</span><span class="v g">${d.sc6Posted}/${d.sc6Total}</span></div>
<div class="row"><span>Tiến độ</span><span class="v b">${d.sc6Total?Math.round(d.sc6Posted/d.sc6Total*100):0}%</span></div></div>
<div class="sec"><h3>🗄️ CRM — 5 tin gần nhất</h3>
${d.recentCRM.map(e=>{const pc=Object.values(e.posted||{}).filter(Boolean).length;return`<div class="ci"><span class="code">${e.code||'—'}</span> <strong>${e.type}</strong> — ${e.loc} — <span style="color:#f5a623">${e.price}</span><span style="float:right;color:#3ecf8e">${pc}/4</span></div>`;}).join('')}
</div>
<div class="foot">${myName} — ${myTitle} | 📞 ${myPhone} | 💬 ${myZalo}<br>#aihockiemtien · AUTO PRO CONTENT BĐS v7 · <em>Ctrl+P để in / lưu PDF</em></div>
</div></body></html>`;
  if(!prof.name)toast('⚠️ Chưa điền Hồ Sơ — báo cáo thiếu tên!');
  dlTxt(html,`bao-cao-${d.monthName.replace(' ','-')}-${d.thisYear}.html`);
  toast('🌐 Xuất HTML xong! Mở file → Ctrl+P → Save as PDF');
}

function copyReportToClipboard(){
  const d=buildReportData();
  const myName=prof.name||'[Chưa điền Hồ Sơ]';
  const myTitle=prof.title||'Môi giới BĐS';
  const myPhone=prof.phone||'[SĐT]';
  const myZalo=prof.zalo||prof.phone||'[Zalo]';
  const txt=
`📊 BÁO CÁO ${d.monthName.toUpperCase()}/${d.thisYear}
━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 ${myName}
🏢 ${myTitle}
📞 ${myPhone} | 💬 Zalo: ${myZalo}
━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 CONTENT & ĐĂNG TIN
• Tổng content: ${d.totalContent}
• ${d.monthName}: ${d.thisMonthContent}${d.growthPct!==0?` (${d.growthPct>0?'+':''}${d.growthPct}% vs tháng trước)`:''}
• Tuần này: ${d.thisWeekContent}
• Đăng: 📘${d.ps.fb} 💬${d.ps.zalo} 🎵${d.ps.tiktok} 🌐${d.ps.web}

🎯 KHÁCH HÀNG
• 🔴 Nóng: ${d.hotKH} · 🟡 Ấm: ${d.warmKH} · ✅ Chốt: ${d.doneKH}
• ⏰ Follow-up đến hạn: ${d.dueRem}

🏘️ CHIẾN THUẬT 6 CĂN
• Tiến độ: ${d.sc6Posted}/${d.sc6Total} content đã đăng (${d.sc6Total?Math.round(d.sc6Posted/d.sc6Total*100):0}%)

━━━━━━━━━━━━━━━━━━━━━━━━━━━
#aihockiemtien · AUTO PRO CONTENT BĐS v7`;
  if(!prof.name)toast('⚠️ Chưa điền Hồ Sơ — báo cáo thiếu tên!');
  cpTxt(txt);
  toast('📋 Đã copy! Paste vào Zalo/Email gửi sếp ngay!');
}

// ===================== GUIDE (NEW) =====================
function buildGuide(){
  const el=document.getElementById('guideContent');if(!el)return;
  const guides=[
    {
      icon:'🏘️',title:'Chiến Thuật 6 Căn — 30 Content Tự Động',color:'var(--rd)',
      steps:[
        'Vào <strong>Chiến Thuật 6 Căn</strong> → Bước ① Nhập 6 BĐS cùng khu, bán kính &le;1.5km',
        'Mỗi căn điền: địa chỉ, loại nhà, giá, DT, điểm mạnh · Bấm <strong>"💾 Lưu căn"</strong>',
        'Bấm <strong>"📂 Gợi ý từ CRM"</strong> để tự điền từ dữ liệu đã lưu — nhanh hơn 3x',
        'Bước ② Cài đặt: ngày bắt đầu, mục tiêu, nền tảng, kiểu phân bổ',
        'Bước ③ Bấm <strong>"🚀 Tạo lịch 30 content"</strong> → Bảng 30 ngày hiện ra đầy đủ',
        'Tick ✓ đã đăng từng nền tảng ngay trên bảng · Bấm <strong>"✍️ Content"</strong> để xem & copy'
      ],
      tip:'💡 Mẹo: 6 căn × 5 tâm lý = 30 content thật. KH tìm nhà khu đó → thấy tên bạn khắp nơi!'
    },
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

  // 3-ebook library section
  el.innerHTML+=`
    <div class="card" style="margin-top:4px;border-color:rgba(245,166,35,.35);background:linear-gradient(135deg,rgba(245,166,35,.07),rgba(76,156,245,.04))">
      <div class="ctit"><span class="dot"></span>📚 Thư Viện 3 Ebook Thực Chiến — Trần Thế Vinh</div>
      <div style="display:grid;gap:9px">
        <div style="background:linear-gradient(135deg,rgba(245,166,35,.1),rgba(245,166,35,.03));border:1px solid rgba(245,166,35,.3);border-radius:10px;padding:12px 14px;display:flex;align-items:center;gap:11px;flex-wrap:wrap">
          <div style="font-size:1.6rem;flex-shrink:0">🏆</div>
          <div style="flex:1;min-width:160px">
            <div style="font-weight:800;font-size:.85rem;color:var(--ac)">Cẩm Nang Bách Thắng</div>
            <div style="font-size:.72rem;color:var(--t2);margin-top:2px">10 Module môi giới thực chiến đầy đủ — từ tư duy đến chốt deal</div>
          </div>
          <button class="btn btn-p btn-sm" onclick="nav('handbook');setTimeout(()=>switchHBBook(0),100)">📖 Đọc ngay</button>
        </div>
        <div style="background:linear-gradient(135deg,rgba(239,83,80,.1),rgba(239,83,80,.03));border:1px solid rgba(239,83,80,.3);border-radius:10px;padding:12px 14px;display:flex;align-items:center;gap:11px;flex-wrap:wrap">
          <div style="font-size:1.6rem;flex-shrink:0">🧠</div>
          <div style="flex:1;min-width:160px">
            <div style="font-weight:800;font-size:.85rem;color:var(--rd)">Chốt Nhà Theo Ma Trận Tâm Lý KH</div>
            <div style="font-size:.72rem;color:var(--t2);margin-top:2px">Chiến thuật phân tích và tác động tâm lý — 5 loại KH, 5 cách chốt khác nhau</div>
          </div>
          <button class="btn btn-sm" style="background:linear-gradient(135deg,var(--rd),#c62828);color:#fff" onclick="nav('handbook');setTimeout(()=>switchHBBook(1),100)">📖 Đọc ngay</button>
        </div>
        <div style="background:linear-gradient(135deg,rgba(76,156,245,.1),rgba(76,156,245,.03));border:1px solid rgba(76,156,245,.3);border-radius:10px;padding:12px 14px;display:flex;align-items:center;gap:11px;flex-wrap:wrap">
          <div style="font-size:1.6rem;flex-shrink:0">🔓</div>
          <div style="flex:1;min-width:160px">
            <div style="font-weight:800;font-size:.85rem;color:var(--bl)">Định Hướng Nhà — Phá Khoá Tâm Lý KH</div>
            <div style="font-size:.72rem;color:var(--t2);margin-top:2px">Định hướng lại nhu cầu KH và phá vỡ rào cản để chốt trong tuần</div>
          </div>
          <button class="btn btn-sm" style="background:linear-gradient(135deg,var(--bl),#1565c0);color:#fff" onclick="nav('handbook');setTimeout(()=>switchHBBook(2),100)">📖 Đọc ngay</button>
        </div>
      </div>
    </div>`;

  // Tips section
  el.innerHTML+=`
    <div class="card" style="margin-top:9px;border-color:rgba(156,110,245,.35);background:linear-gradient(135deg,rgba(156,110,245,.08),rgba(76,156,245,.05))">
      <div class="ctit"><span class="dot" style="background:var(--pu)"></span>💡 Gợi Ý Tính Năng & Tip Hay</div>
      <div style="display:grid;gap:8px">
        ${[
          {t:'Quy trình v7 tối ưu',d:'🏘️ 6 Căn → 🔍 Khảo Sát → 🏷️ Định Giá → ✍️ Tạo Content → 📅 Lịch 30 Ngày → 🎯 Chấm Điểm → 🗄️ CRM',c:'var(--rd)'},
          {t:'Content 5x mỗi ngày',d:'Dùng chế độ "5 phiên bản" để có content cho 5 tâm lý KH chỉ trong 1 lần bấm',c:'var(--gr)'},
          {t:'Follow-up = Vàng',d:'80% giao dịch được chốt sau lần follow-up thứ 3-7. Đặt nhắc lịch ngay!',c:'var(--ac)'},
          {t:'6 Căn = Bao Phủ Khu Vực',d:'1 người làm việc = sức mạnh 6 người. KH tìm nhà khu đó → thấy tên bạn khắp nơi',c:'var(--rd)'},
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
  const d={crm,tpl,prof,reminders,contentLog,sc6:sc6Data,v:7,t:new Date().toISOString()};
  dlTxt(JSON.stringify(d,null,2),'backup-bds-v7-'+Date.now()+'.json');toast('💾 Đã backup!');
}
function doRestore(){
  const inp=document.createElement('input');inp.type='file';inp.accept='.json';
  inp.onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>{try{const d=JSON.parse(ev.target.result);if(d.crm)crm=d.crm;if(d.tpl)tpl=d.tpl;if(d.reminders)reminders=d.reminders;if(d.contentLog)contentLog=d.contentLog;if(d.sc6)sc6Data=d.sc6;if(d.prof){prof=d.prof;loadProfInp();if(prof.avatar)showAv(prof.avatar);}saveSt();saveSC();buildCRM();buildTpl();buildProf();buildEarn();buildReminders();buildDashboard();updStats();buildHomeRecent();toast('🔄 Đã restore!');}catch(x){toast('❌ File không hợp lệ!');}};r.readAsText(f);};
  inp.click();
}
function dlTxt(c,fn){const b=new Blob([c],{type:'text/plain;charset=utf-8'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=fn;a.click();}

// ===================== NAV =====================
function nav(id){
  document.querySelectorAll('.pg').forEach(p=>p.classList.remove('on'));
  const pg=document.getElementById('pg-'+id);if(pg)pg.classList.add('on');
  document.querySelectorAll('.ni').forEach(n=>n.classList.remove('on'));
  const mp={home:'🏠',gen:'✍️',sch:'📅',scr:'🎯',ab:'⚡',remix:'🔁',survey:'🔍',valuation:'🏷️',readkh:'🎭',guidetour:'🏡',salescripts:'💬',tools:'🔧',cmp:'📊',fs:'🔮',handbook:'📚',tpl:'📌',crm:'🗄️',ag:'🤖',earn:'💰',charity:'❤️',prof:'👤',reminder:'⏰',dashboard:'📊',guide:'❓',sixcan:'🏘️',morning:'☀️',calendar:'📅',khlabels:'🎯',timeline:'📋',spin:'🔄'};
  document.querySelectorAll('.ni').forEach(n=>{const ic=n.querySelector('.ic');if(ic&&ic.textContent.trim()===mp[id])n.classList.add('on');});
  const sb=document.getElementById('sb');if(sb&&sb.classList.contains('mob'))sb.classList.remove('mob');
  window.scrollTo&&window.scrollTo(0,0);
  // Lazy build for new pages
  if(id==='dashboard')buildDashboard();
  if(id==='guide')buildGuide();
  if(id==='reminder')buildReminders();
  if(id==='morning'){buildMorningChecklist();updCKBadge();}
  if(id==='calendar')buildCalendar();
  if(id==='khlabels')buildKHLabels();
  if(id==='timeline')buildTLSelect();
  if(id==='sixcan')initSixCan();
  if(id==='handbook')buildHBExtra();
  if(id==='spin'){buildSPINKHSelect();if(!document.getElementById('spinQArea').innerHTML)showSPINPhase(0);}
}

// ===================== CHIẾN THUẬT 6 CĂN =====================
// (sc6Data đã khai báo ở STATE section phía trên)

const SC_PSY_CFG = {
  'Tham':  {e:'💰',c:'var(--ac)', bg:'rgba(245,166,35,.15)',  border:'rgba(245,166,35,.5)',
    keywords:['Giá tốt nhất khu vực','Chủ cần bán gấp','Mức tài chính hiếm','Khả năng tăng giá','Giữ tiền tốt hơn gửi bank','Cơ hội mua hời'],
    angle:'Tạo cảm giác "mua hời" — nhấn giá, tiềm năng sinh lời, khan hiếm'},
  'Sân':   {e:'🔥',c:'var(--rd)', bg:'rgba(239,83,80,.12)',   border:'rgba(239,83,80,.45)',
    keywords:['Đẹp hơn nhà cùng phân khúc','Hẻm rộng hơn','Thiết kế nổi bật','Vị trí tốt hơn khu vực'],
    angle:'Tạo cảm giác "chọn thông minh hơn người khác"'},
  'Si':    {e:'🤔',c:'var(--bl)', bg:'rgba(76,156,245,.12)',  border:'rgba(76,156,245,.45)',
    keywords:['Tổ ấm gia đình trẻ','Không gian sống bình yên','Gần trường học','Đi làm thuận tiện','An cư lâu dài'],
    angle:'Đánh vào cảm xúc — hình dung cuộc sống tương lai'},
  'Nghi ngờ':{e:'🔍',c:'var(--gr)',bg:'rgba(62,207,142,.12)', border:'rgba(62,207,142,.45)',
    keywords:['Nhà thật 100%','Video quay thực tế','Sổ hồng chính chủ','Thông tin minh bạch','Không đăng giá ảo'],
    angle:'Xây dựng niềm tin — chứng minh bằng bằng chứng thực'},
  'Ngạo mạn':{e:'👑',c:'var(--pu)',bg:'rgba(156,110,245,.12)',border:'rgba(156,110,245,.45)',
    keywords:['Nhà có gu riêng','Không gian riêng tư','Khu dân cư chất lượng','Phong cách sống khác biệt'],
    angle:'Tạo cảm giác vị thế và đẳng cấp'}
};

const SC_DAYS_VN = ['CN','T2','T3','T4','T5','T6','T7'];
const SC_GOLDEN_HOURS = {
  T2:'8:00 & 20:00', T3:'19:00–21:00', T4:'12:00 & 20:00',
  T5:'8:00 & 17:00', T6:'12:00–22:00', T7:'9:00–21:00', CN:'10:00–20:00'
};
const SC_PLT_LABELS = {fb:'📘 FB',zalo:'💬 Zalo',tiktok:'🎵 TikTok',web:'🌐 Web'};
const SC_PLT_PRIORITY = {T2:'fb',T3:'tiktok',T4:'fb',T5:'zalo',T6:'fb',T7:'fb',CN:'zalo'};

// ── Load / Save ──
function loadSC(){try{const s=localStorage.getItem('bds_sc6');if(s)sc6Data=JSON.parse(s);}catch(e){}}
function saveSC(){try{localStorage.setItem('bds_sc6',JSON.stringify(sc6Data));}catch(e){}}

// ── Init ──
function initSixCan(){
  loadSC();
  buildSCSlots();
  buildSCPsyGrid();
  // Set default start date to today
  const sd=document.getElementById('sc_startdate');
  if(sd&&!sc6Data.settings.startDate){
    const t=new Date();t.setMinutes(t.getMinutes()-t.getTimezoneOffset());
    sd.value=t.toISOString().split('T')[0];
  } else if(sd){sd.value=sc6Data.settings.startDate;}
  // Restore platform pills
  document.querySelectorAll('#scPltPills .pill').forEach(p=>{
    const v=p.dataset.v;
    p.classList.toggle('on',sc6Data.settings.platforms.includes(v));
  });
  // Restore goal
  const sg=document.getElementById('sc_goal');if(sg)sg.value=sc6Data.settings.goal||'Chốt nhanh';
  // Restore dist
  const sd2=document.getElementById('sc_dist');if(sd2)sd2.value=sc6Data.settings.dist||'smart';
  // If schedule exists, show tab 3
  if(sc6Data.schedule.length){
    switchSCTab(3,document.getElementById('sctab3'));
    renderSC30Table();
    renderSCStats();
    buildSCCanSelect();
  }
}

// ── Slots builder ──
function buildSCSlots(){
  const el=document.getElementById('scSlots');if(!el)return;
  el.innerHTML=sc6Data.slots.map((slot,i)=>{
    const filled=slot.filled;
    return`<div class="sc-slot${filled?' filled':''}" id="scslot_${i}">
      <div class="sc-slot-head">
        <div class="sc-num">${i+1}</div>
        <div class="sc-slot-title">${filled?`<span style="color:var(--ac);font-family:'Space Mono',monospace;font-size:.68rem">${slot.code||''}</span> ${slot.type} — ${slot.addr.substring(0,35)}${slot.addr.length>35?'...':''}`:'<span style="color:var(--t3)">Chưa nhập thông tin căn nhà</span>'}</div>
        <span class="sc-slot-badge ${filled?'':''}\" style="background:${filled?'rgba(62,207,142,.15)':'var(--bg3)'};color:${filled?'var(--gr)':'var(--t3)'}">${filled?'✅ Đã nhập':'⬜ Trống'}</span>
        <button class="btn btn-s btn-xs" style="margin-left:6px" onclick="toggleSCSlot(${i})">${filled?'✏️ Sửa':'➕ Nhập'}</button>
      </div>
      <div class="sc-body" id="scbody_${i}" style="display:${filled?'none':'block'}">
        <div class="fg2" style="margin-top:4px">
          <div class="fg"><label>🏠 Địa chỉ <span style="font-size:.62rem;color:var(--t3)">(tên đường, phường)</span></label>
            <input type="text" id="sc_addr_${i}" value="${slot.addr||''}" placeholder="VD: 47/3 Phan Văn Trị, P.11, Bình Thạnh" oninput="scSlotChange(${i})">
          </div>
          <div class="fg"><label>🔢 Mã căn <span class="lib-btn" onclick="scAutoCode(${i})">⚡ Tự sinh</span></label>
            <input type="text" id="sc_code_${i}" value="${slot.code||''}" placeholder="VD: NP-BTH-20260516-xxxx" style="font-family:'Space Mono',monospace;font-size:.72rem;color:var(--ac)" oninput="scSlotChange(${i})">
          </div>
          <div class="fg"><label>🏡 Loại nhà <span class="lib-btn" onclick="openLib('sc_type_${i}','type')">➕</span></label>
            <input type="text" id="sc_type_${i}" value="${slot.type||''}" placeholder="Nhà phố, căn hộ..." oninput="scSlotChange(${i})">
          </div>
          <div class="fg"><label>💰 Giá <span class="lib-btn" onclick="openLib('sc_price_${i}','price')">➕</span></label>
            <input type="text" id="sc_price_${i}" value="${slot.price||''}" placeholder="5.5 tỷ..." oninput="scSlotChange(${i})">
          </div>
          <div class="fg"><label>📐 Diện tích</label>
            <input type="text" id="sc_area_${i}" value="${slot.area||''}" placeholder="80m²" oninput="scSlotChange(${i})">
          </div>
          <div class="fg"><label>🏗️ Số tầng</label>
            <input type="text" id="sc_floors_${i}" value="${slot.floors||''}" placeholder="3 tầng" oninput="scSlotChange(${i})">
          </div>
          <div class="fg full"><label>⭐ Điểm mạnh nổi bật <span class="lib-btn" onclick="openLib('sc_pros_${i}','pros')">➕ Thư viện</span></label>
            <input type="text" id="sc_pros_${i}" value="${slot.pros||''}" placeholder="Sổ hồng, hẻm xe hơi, gần trường..." oninput="scSlotChange(${i})">
          </div>
        </div>
        <div style="display:flex;gap:6px;margin-top:8px">
          <button class="btn btn-g btn-sm" onclick="saveSCSlot(${i})">💾 Lưu căn ${i+1}</button>
          <button class="btn btn-r btn-xs" onclick="clearSCSlot(${i})">🗑️</button>
        </div>
      </div>
    </div>`;
  }).join('');
  // Update progress
  const filled=sc6Data.slots.filter(s=>s.filled).length;
  const prog=document.getElementById('scProgress');
  if(!prog){
    const p=document.createElement('div');p.id='scProgress';
    p.style.cssText='font-size:.74rem;color:var(--t2);margin-bottom:10px;display:flex;align-items:center;gap:8px';
    document.getElementById('scSlots').before(p);
  }
  const pp=document.getElementById('scProgress');
  if(pp){
    const pct=Math.round(filled/6*100);
    pp.innerHTML=`<div style="flex:1;height:6px;background:var(--bg3);border-radius:4px;overflow:hidden"><div style="height:100%;width:${pct}%;background:linear-gradient(90deg,var(--ac),var(--gr));border-radius:4px;transition:.4s"></div></div><span style="font-weight:700;color:${filled===6?'var(--gr)':'var(--t2)'}">${filled}/6 căn ${filled===6?'✅ Đủ rồi!':''}</span>`;
  }
}

function toggleSCSlot(i){
  const body=document.getElementById('scbody_'+i);
  if(body)body.style.display=body.style.display==='none'?'block':'none';
}

function scSlotChange(i){
  const get=id=>(document.getElementById(id)?.value||'').trim();
  sc6Data.slots[i].addr=get(`sc_addr_${i}`);
  sc6Data.slots[i].code=get(`sc_code_${i}`);
  sc6Data.slots[i].type=get(`sc_type_${i}`);
  sc6Data.slots[i].price=get(`sc_price_${i}`);
  sc6Data.slots[i].area=get(`sc_area_${i}`);
  sc6Data.slots[i].floors=get(`sc_floors_${i}`);
  sc6Data.slots[i].pros=get(`sc_pros_${i}`);
}

function saveSCSlot(i){
  scSlotChange(i);
  const s=sc6Data.slots[i];
  if(!s.addr&&!s.type)return toast('⚠️ Nhập ít nhất địa chỉ hoặc loại nhà!');
  if(!s.code)s.code=genPropCode(s.type||'NP',s.addr||'KV',Date.now());
  s.filled=true;
  saveSC();buildSCSlots();
  // Close slot after save
  setTimeout(()=>{const b=document.getElementById('scbody_'+i);if(b)b.style.display='none';},100);
  toast(`✅ Đã lưu Căn ${i+1}!`);
}

function clearSCSlot(i){
  sc6Data.slots[i]={id:i+1,addr:'',type:'',price:'',area:'',floors:'',pros:'',code:'',filled:false};
  saveSC();buildSCSlots();toast('🗑️ Đã xóa căn '+(i+1));
}

function scAutoCode(i){
  const type=(document.getElementById(`sc_type_${i}`)?.value||'NP').trim();
  const addr=(document.getElementById(`sc_addr_${i}`)?.value||'KV').trim();
  const code=genPropCode(type,addr,Date.now());
  const el=document.getElementById(`sc_code_${i}`);
  if(el){el.value=code;scSlotChange(i);}
}

// ── Psy grid ──
function buildSCPsyGrid(){
  const el=document.getElementById('scPsyGrid');if(!el)return;
  const all=['Tham','Sân','Si','Nghi ngờ','Ngạo mạn'];
  el.innerHTML=all.map(p=>{
    const cfg=SC_PSY_CFG[p];
    const on=sc6Data.settings.psyList.includes(p);
    return`<div class="psy-sel${on?' on':''}" data-p="${p}" onclick="toggleSCPsy(this,'${p}')" style="${on?`background:${cfg.bg};border-color:${cfg.border};color:${cfg.c}`:''}">
      <div style="font-size:1.1rem">${cfg.e}</div>
      <div style="font-weight:700;font-size:.68rem;margin-top:2px">${p}</div>
    </div>`;
  }).join('');
}

function toggleSCPsy(el,p){
  const idx=sc6Data.settings.psyList.indexOf(p);
  if(idx>=0){
    if(sc6Data.settings.psyList.length<=1)return toast('⚠️ Cần ít nhất 1 tâm lý!');
    sc6Data.settings.psyList.splice(idx,1);
    el.classList.remove('on');
    el.style.background='';el.style.borderColor='';el.style.color='';
  } else {
    sc6Data.settings.psyList.push(p);
    const cfg=SC_PSY_CFG[p];
    el.classList.add('on');
    el.style.background=cfg.bg;el.style.borderColor=cfg.border;el.style.color=cfg.c;
  }
}

function toggleSCPlt(el){
  const v=el.dataset.v;
  el.classList.toggle('on');
  const active=[...document.querySelectorAll('#scPltPills .pill.on')].map(p=>p.dataset.v);
  if(active.length===0){el.classList.add('on');return;}
  sc6Data.settings.platforms=active;
}

// ── Validate & move to settings ──
function validateAndNextSC(){
  const filled=sc6Data.slots.filter(s=>s.filled);
  if(filled.length<2)return toast('⚠️ Cần nhập ít nhất 2 căn để tạo chiến dịch!');
  if(filled.length<6){
    if(!confirm(`Hiện có ${filled.length}/6 căn. Tiếp tục với ${filled.length} căn?`))return;
  }
  switchSCTab(2,document.getElementById('sctab2'));
}

// ── Generate 30-day schedule ──
function generateSC30(){
  // Save settings
  const sd=document.getElementById('sc_startdate')?.value;
  if(!sd)return toast('⚠️ Chọn ngày bắt đầu!');
  sc6Data.settings.startDate=sd;
  sc6Data.settings.goal=document.getElementById('sc_goal')?.value||'Chốt nhanh';
  sc6Data.settings.dist=document.getElementById('sc_dist')?.value||'smart';
  sc6Data.settings.platforms=[...document.querySelectorAll('#scPltPills .pill.on')].map(p=>p.dataset.v);
  if(!sc6Data.settings.platforms.length)return toast('⚠️ Chọn ít nhất 1 nền tảng!');
  const filledSlots=sc6Data.slots.filter(s=>s.filled);
  const psyList=sc6Data.settings.psyList;
  const nCan=filledSlots.length;
  const nPsy=psyList.length;
  const dist=sc6Data.settings.dist;
  // Build all combos: nCan × nPsy
  let combos=[];
  filledSlots.forEach((slot,ci)=>{
    psyList.forEach((psy,pi)=>{
      combos.push({slotIdx:sc6Data.slots.indexOf(slot),canNum:ci+1,psy,slot});
    });
  });
  // Distribute into 30 days
  const totalDays=30;
  let schedule=[];
  if(dist==='smart'){
    // Shuffle: no same can on consecutive days, cycle through combos
    let remaining=[...combos];let lastCan=-1;
    for(let d=0;d<totalDays;d++){
      if(!remaining.length)remaining=[...combos];
      // Prefer different can from last
      let pick=remaining.find(c=>c.canNum!==lastCan)||remaining[0];
      remaining.splice(remaining.indexOf(pick),1);
      schedule.push({day:d+1,...pick});
      lastCan=pick.canNum;
    }
  } else if(dist==='bycan'){
    // 5 days per can, cycle through psy
    let d=0;
    filledSlots.forEach((slot,ci)=>{
      for(let j=0;j<5&&d<totalDays;j++,d++){
        const psy=psyList[j%nPsy];
        schedule.push({day:d+1,slotIdx:sc6Data.slots.indexOf(slot),canNum:ci+1,psy,slot});
      }
    });
    // fill remaining
    let i=0;while(schedule.length<totalDays){const c=combos[i%combos.length];schedule.push({day:schedule.length+1,...c});i++;}
  } else {// bypsy
    let d=0;
    psyList.forEach((psy,pi)=>{
      for(let j=0;j<6&&d<totalDays;j++,d++){
        const slot=filledSlots[j%nCan];
        schedule.push({day:d+1,slotIdx:sc6Data.slots.indexOf(slot),canNum:j%nCan+1,psy,slot});
      }
    });
    let i=0;while(schedule.length<totalDays){const c=combos[i%combos.length];schedule.push({day:schedule.length+1,...c});i++;}
  }
  // Attach dates, weekday, platform, time
  const startD=new Date(sd);
  schedule=schedule.map((item,i)=>{
    const d=new Date(startD);d.setDate(d.getDate()+i);
    const wd=SC_DAYS_VN[d.getDay()];
    const plts=sc6Data.settings.platforms;
    // Rotate platforms smartly
    const mainPlt=plts[i%plts.length];
    const extraPlt=plts[(i+1)%plts.length];
    const time=SC_GOLDEN_HOURS[wd]||'8:00 & 20:00';
    return{...item,date:d.toLocaleDateString('vi-VN'),dateISO:d.toISOString().split('T')[0],wd,mainPlt,extraPlt,time};
  });
  sc6Data.schedule=schedule;
  sc6Data.posted={};
  saveSC();
  switchSCTab(3,document.getElementById('sctab3'));
  renderSC30Table();
  renderSCStats();
  buildSCCanSelect();
  toast('🎉 Đã tạo lịch 30 ngày!');
}

// ── Render 30-day table ──
function renderSC30Table(){
  const body=document.getElementById('sc30Body');if(!body)return;
  const title=document.getElementById('scCampaignTitle');
  const sub=document.getElementById('scCampaignSub');
  const filled=sc6Data.slots.filter(s=>s.filled);
  if(title)title.textContent=`Chiến dịch ${filled.length} căn — ${sc6Data.settings.goal}`;
  if(sub)sub.textContent=`Bắt đầu: ${sc6Data.settings.startDate} · ${sc6Data.schedule.length} content · ${sc6Data.settings.platforms.map(p=>SC_PLT_LABELS[p]).join(' ')}`;
  let html='';let curWeek=-1;
  sc6Data.schedule.forEach((item,idx)=>{
    const weekNum=Math.floor(idx/7)+1;
    if(weekNum!==curWeek){
      curWeek=weekNum;
      html+=`<tr><td colspan="7" class="sc-week-sep">📅 Tuần ${weekNum} — ${item.date}${weekNum<4?' đến '+sc6Data.schedule[Math.min(idx+6,29)]?.date:''}</td></tr>`;
    }
    const cfg=SC_PSY_CFG[item.psy]||SC_PSY_CFG['Si'];
    const slot=sc6Data.slots[item.slotIdx]||{};
    const postedKey=`${idx}_${item.mainPlt}`;
    const isDone=sc6Data.posted[postedKey];
    const plts=sc6Data.settings.platforms;
    const pltChips=plts.map(p=>{const k=`${idx}_${p}`;const d=sc6Data.posted[k];return`<span class="sc-plt-chip${d?' done':''}" onclick="toggleSCPosted(${idx},'${p}',this)" style="cursor:pointer" title="Click để đánh dấu đã đăng ${SC_PLT_LABELS[p]}">${SC_PLT_LABELS[p]}${d?' ✓':''}</span>`;}).join('');
    html+=`<tr class="${isDone?'done-row':''}">
      <td><div class="sc-day-num">N${item.day}</div><div style="font-size:.62rem;color:var(--t3)">${item.date}</div></td>
      <td><span style="font-weight:700;color:var(--t2);font-size:.72rem">${item.wd}</span></td>
      <td>
        <div style="font-size:.7rem;font-weight:700;color:var(--tx)">Căn ${item.canNum}</div>
        <div style="font-size:.65rem;color:var(--t3)">${slot.addr?.substring(0,28)||'—'}</div>
        <div style="font-size:.6rem;color:var(--ac);font-family:'Space Mono',monospace">${slot.code||''}</div>
      </td>
      <td><span class="sc-psy-badge" style="background:${cfg.bg};color:${cfg.c};border:1px solid ${cfg.border}">${cfg.e} ${item.psy}</span></td>
      <td><div class="sc-plt-chips">${pltChips}</div></td>
      <td><div style="font-size:.68rem;color:var(--gr);font-weight:600">🕐 ${item.time}</div></td>
      <td><button class="btn btn-s btn-xs" onclick="previewSCDay(${idx})">✍️ Content</button></td>
    </tr>`;
  });
  body.innerHTML=html;
}

function toggleSCPosted(dayIdx,plt,el){
  const key=`${dayIdx}_${plt}`;
  sc6Data.posted[key]=!sc6Data.posted[key];
  el.classList.toggle('done',sc6Data.posted[key]);
  el.textContent=SC_PLT_LABELS[plt]+(sc6Data.posted[key]?' ✓':'');
  saveSC();renderSCStats();
}

// ── Stats ──
function renderSCStats(){
  const el=document.getElementById('scStats');if(!el)return;
  const total=sc6Data.schedule.length;
  const plts=sc6Data.settings.platforms;
  const totalSlots=total*plts.length;
  const posted=Object.values(sc6Data.posted).filter(Boolean).length;
  const pct=totalSlots?Math.round(posted/totalSlots*100):0;
  const canCounts={};
  sc6Data.schedule.forEach(item=>{canCounts[item.canNum]=(canCounts[item.canNum]||0)+1;});
  const psyCounts={};
  sc6Data.schedule.forEach(item=>{psyCounts[item.psy]=(psyCounts[item.psy]||0)+1;});
  const topPsy=Object.entries(psyCounts).sort((a,b)=>b[1]-a[1])[0]?.[0]||'—';
  const cfg=SC_PSY_CFG[topPsy]||{e:'—'};
  el.innerHTML=[
    {n:total,l:'Content lịch',c:'var(--ac)'},
    {n:posted,l:'Đã đăng',c:'var(--gr)'},
    {n:pct+'%',l:'Tiến độ',c:'var(--bl)'},
    {n:cfg.e+' '+topPsy,l:'Tâm lý nhiều nhất',c:'var(--pu)'}
  ].map(s=>`<div style="background:var(--card);border:1px solid var(--border);border-radius:10px;padding:11px;text-align:center"><div style="font-size:1.3rem;font-weight:900;color:${s.c};font-family:'Space Mono',monospace;line-height:1.2">${s.n}</div><div style="font-size:.63rem;color:var(--t3);margin-top:3px">${s.l}</div></div>`).join('');
}

// ── Preview single day content ──
function previewSCDay(dayIdx){
  const item=sc6Data.schedule[dayIdx];if(!item)return;
  const slot=sc6Data.slots[item.slotIdx]||{};
  // Fill gen form with this slot data and navigate to content view
  const d={type:slot.type||'Nhà phố',price:slot.price||'',area:slot.area||'',loc:slot.addr||'',pros:slot.pros||''};
  // Build content inline using existing engine
  const ct=`📞 ${prof.phone||'SĐT'} | ${prof.name||'Môi giới'}`;
  const gs=[sc6Data.settings.goal||'Chốt nhanh'];
  const frm='AIDA';
  const content={
    fb:mkFB(d,item.psy,frm,gs,ct),
    zalo:mkZL(d,item.psy,gs,ct),
    tiktok:mkTT(d,item.psy,gs,ct),
    web:mkWB(d,item.psy,ct)
  };
  // Show in tab 4
  switchSCTab(4,document.getElementById('sctab4'));
  // Set selects
  const vc=document.getElementById('sc_viewCan');
  if(vc)vc.value=item.slotIdx;
  const vp=document.getElementById('sc_viewPsy');
  if(vp)vp.value=item.psy;
  // Render
  const out=document.getElementById('scContentOut');if(!out)return;
  const cfg=SC_PSY_CFG[item.psy]||SC_PSY_CFG['Si'];
  out.innerHTML=`
    <div style="background:${cfg.bg};border:1px solid ${cfg.border};border-radius:10px;padding:11px 14px;margin-bottom:11px;display:flex;align-items:center;gap:9px;flex-wrap:wrap">
      <div style="font-size:1.3rem">${cfg.e}</div>
      <div style="flex:1">
        <div style="font-weight:800;font-size:.85rem;color:var(--tx)">Căn ${item.canNum} — Tâm lý: ${item.psy}</div>
        <div style="font-size:.71rem;color:var(--t3)">${slot.addr||'—'} · ${slot.price||'—'} · ${item.date}</div>
        <div style="font-size:.7rem;color:var(--t2);margin-top:2px;font-style:italic">📌 Góc tiếp cận: ${cfg.angle}</div>
      </div>
    </div>
    <div class="ptabs" id="scPTabs">
      <div class="ptab on" onclick="showSCPlt(this,'fb',${JSON.stringify(content).replace(/"/g,'&quot;')})">📘 Facebook</div>
      <div class="ptab" onclick="showSCPlt(this,'zalo',${JSON.stringify(content).replace(/"/g,'&quot;')})">💬 Zalo</div>
      <div class="ptab" onclick="showSCPlt(this,'tiktok',${JSON.stringify(content).replace(/"/g,'&quot;')})">🎵 TikTok</div>
      <div class="ptab" onclick="showSCPlt(this,'web',${JSON.stringify(content).replace(/"/g,'&quot;')})">🌐 Website</div>
    </div>
    <div class="cbox" id="scContentBox">
      <pre id="scPre" style="white-space:pre-wrap;font-family:'Be Vietnam Pro',sans-serif;font-size:.78rem;line-height:1.78;color:var(--tx);padding-right:52px">${esc(content.fb)}</pre>
      <button class="cpbtn" onclick="cpEl('scPre')">📋 Copy</button>
    </div>
    <div style="margin-top:9px;display:flex;gap:6px;flex-wrap:wrap">
      <button class="btn btn-g btn-sm" onclick="saveOutputToLibrary('🏘️ Căn ${item.canNum} – ${item.psy}',document.getElementById('scPre').textContent,'sixcan')">💾 Lưu thư viện</button>
      <button class="btn btn-s btn-sm" onclick="switchSCTab(3,document.getElementById('sctab3'))">← Về lịch</button>
    </div>`;
}

function showSCPlt(el,plt,content){
  document.querySelectorAll('#scPTabs .ptab').forEach(t=>t.classList.remove('on'));
  el.classList.add('on');
  const pre=document.getElementById('scPre');
  if(pre)pre.textContent=content[plt]||'';
}

// ── Content view tab ──
function buildSCCanSelect(){
  const sel=document.getElementById('sc_viewCan');if(!sel)return;
  const filled=sc6Data.slots.map((s,i)=>({...s,i})).filter(s=>s.filled);
  sel.innerHTML='<option value="">-- Chọn căn --</option>'+
    filled.map(s=>`<option value="${s.i}">Căn ${s.i+1} — ${s.addr?.substring(0,30)||s.type}</option>`).join('');
}

function renderSCContent(){
  const canIdx=document.getElementById('sc_viewCan')?.value;
  const psy=document.getElementById('sc_viewPsy')?.value;
  const plt=document.getElementById('sc_viewPlt')?.value||'fb';
  if(canIdx===''||!psy)return;
  const slot=sc6Data.slots[parseInt(canIdx)];if(!slot||!slot.filled)return;
  const d={type:slot.type||'Nhà phố',price:slot.price||'',area:slot.area||'',loc:slot.addr||'',pros:slot.pros||''};
  const ct=`📞 ${prof.phone||'SĐT'} | ${prof.name||'Môi giới'}`;
  const gs=[sc6Data.settings.goal||'Chốt nhanh'];
  const content={fb:mkFB(d,psy,'AIDA',gs,ct),zalo:mkZL(d,psy,gs,ct),tiktok:mkTT(d,psy,gs,ct),web:mkWB(d,psy,ct)};
  const cfg=SC_PSY_CFG[psy]||SC_PSY_CFG['Si'];
  const out=document.getElementById('scContentOut');if(!out)return;
  const pid='scv_'+Date.now();
  out.innerHTML=`
    <div style="background:${cfg.bg};border:1px solid ${cfg.border};border-radius:9px;padding:9px 13px;margin-bottom:10px;font-size:.73rem;color:var(--t2)">
      📌 <strong style="color:${cfg.c}">${cfg.e} ${psy}:</strong> ${cfg.angle}
    </div>
    <div class="cbox"><pre id="${pid}" style="white-space:pre-wrap;font-family:'Be Vietnam Pro',sans-serif;font-size:.78rem;line-height:1.78;color:var(--tx);padding-right:52px">${esc(content[plt]||'')}</pre><button class="cpbtn" onclick="cpEl('${pid}')">📋 Copy</button></div>
    <div style="margin-top:8px;display:flex;gap:6px"><button class="btn btn-g btn-sm" onclick="saveOutputToLibrary('🏘️ Căn ${parseInt(canIdx)+1} – ${psy}',document.getElementById('${pid}').textContent,'sixcan')">💾 Lưu</button></div>`;
}

// ── Tab switcher ──
function switchSCTab(n,el){
  [1,2,3,4].forEach(i=>{
    const pg=document.getElementById('scpg'+i);if(pg)pg.style.display=i===n?'block':'none';
    const tb=document.getElementById('sctab'+i);if(tb)tb.classList.toggle('on',i===n);
  });
  if(n===3&&sc6Data.schedule.length){renderSC30Table();renderSCStats();}
  if(n===4){buildSCCanSelect();}
}

// ── Helpers ──
function scAutoFromCRM(){
  if(!crm.length)return toast('⚠️ CRM chưa có dữ liệu! Lưu tin vào CRM trước.');
  // Fill empty slots from CRM entries
  let filled=0;
  crm.slice(0,6).forEach((e,i)=>{
    if(sc6Data.slots[i]&&!sc6Data.slots[i].filled){
      sc6Data.slots[i]={id:i+1,addr:e.loc||'',type:e.type||'',price:e.price||'',area:e.area||'',floors:'',pros:e.pros||'',code:e.code||'',filled:true};
      filled++;
    }
  });
  if(!filled)return toast('⚠️ Tất cả slot đã có dữ liệu!');
  saveSC();buildSCSlots();toast(`✅ Đã gợi ý ${filled} căn từ CRM!`);
}

function clearSixCan(){
  if(!confirm('Xóa toàn bộ dữ liệu chiến dịch 6 căn?'))return;
  sc6Data={slots:Array.from({length:6},(_,i)=>({id:i+1,addr:'',type:'',price:'',area:'',floors:'',pros:'',code:'',filled:false})),settings:{startDate:'',goal:'Chốt nhanh',platforms:['fb','zalo','tiktok'],dist:'smart',psyList:['Tham','Sân','Si','Nghi ngờ','Ngạo mạn']},schedule:[],posted:{}};
  saveSC();initSixCan();toast('🗑️ Đã xóa!');
}

function clearSC30(){
  if(!confirm('Xóa lịch 30 ngày?'))return;
  sc6Data.schedule=[];sc6Data.posted={};
  saveSC();
  document.getElementById('sc30Body').innerHTML='';
  document.getElementById('scStats').innerHTML='';
  switchSCTab(1,document.getElementById('sctab1'));
  toast('🗑️ Đã xóa lịch!');
}

function expSC30(){
  if(!sc6Data.schedule.length)return toast('⚠️ Chưa có lịch!');
  const filled=sc6Data.slots.filter(s=>s.filled);
  let txt=`CHIẾN THUẬT 6 CĂN — LỊCH 30 NGÀY\n${'='.repeat(50)}\n`;
  txt+=`Chiến dịch: ${filled.length} căn · ${sc6Data.settings.goal}\n`;
  txt+=`Bắt đầu: ${sc6Data.settings.startDate}\n`;
  txt+=`Nền tảng: ${sc6Data.settings.platforms.map(p=>SC_PLT_LABELS[p]).join(', ')}\n\n`;
  txt+=`DANH SÁCH ${filled.length} CĂN:\n`;
  filled.forEach((s,i)=>{txt+=`Căn ${i+1}: [${s.code}] ${s.type} — ${s.addr} — ${s.price} — ${s.area}\n`;});
  txt+=`\n${'─'.repeat(50)}\nLỊCH CHI TIẾT:\n\n`;
  let week=0;
  sc6Data.schedule.forEach((item,i)=>{
    const w=Math.floor(i/7)+1;
    if(w!==week){week=w;txt+=`\n📅 TUẦN ${w}\n${'─'.repeat(30)}\n`;}
    const slot=sc6Data.slots[item.slotIdx]||{};
    const postedAny=sc6Data.settings.platforms.some(p=>sc6Data.posted[`${i}_${p}`]);
    txt+=`Ngày ${item.day} [${item.wd}] ${item.date}${postedAny?' ✅':''}\n`;
    txt+=`  Căn: ${item.canNum} — ${slot.addr||'—'} (${slot.price||'—'})\n`;
    txt+=`  Tâm lý: ${SC_PSY_CFG[item.psy]?.e||''} ${item.psy}\n`;
    txt+=`  Giờ đăng: ${item.time}\n`;
    txt+=`  Nền tảng: ${sc6Data.settings.platforms.map(p=>SC_PLT_LABELS[p]).join(' · ')}\n\n`;
  });
  dlTxt(txt,`chien-thuat-6-can-${sc6Data.settings.startDate||Date.now()}.txt`);
  toast('📄 Đã xuất lịch!');
}

// ===================== SPIN SELLING =====================
const SPIN_QUESTIONS=[
  {phase:0,phaseLabel:'S',q:'Hiện tại anh/chị đang ở chỗ thuê hay nhà riêng ạ?',tip:'Xác định tình trạng ở hiện tại — nền tảng cho toàn bộ cuộc trò chuyện.',key:'current_housing'},
  {phase:0,phaseLabel:'S',q:'Gia đình mình mấy người, bé lớn nhỏ thế nào ạ?',tip:'Hiểu quy mô gia đình → gợi ý đúng số phòng, loại nhà.',key:'family_size'},
  {phase:0,phaseLabel:'S',q:'Anh/chị đang làm việc ở khu vực nào, đi lại hàng ngày thế nào ạ?',tip:'Vị trí làm việc → gợi ý khu BĐS phù hợp.',key:'work_location'},
  {phase:0,phaseLabel:'S',q:'Ngân sách mình đang chuẩn bị khoảng bao nhiêu? Anh/chị định vay NH không?',tip:'Hiểu tài chính thực → không lãng phí thời gian xem nhà không phù hợp.',key:'budget'},
  {phase:0,phaseLabel:'S',q:'Anh/chị đã xem qua khu vực nào chưa, ấn tượng hoặc không ấn tượng chỗ nào ạ?',tip:'Biết KH đã tìm hiểu đến đâu → tránh giới thiệu lại điều họ đã biết.',key:'viewed_areas'},
  {phase:0,phaseLabel:'S',q:'Mục đích chính là mua để ở, đầu tư hay cho thuê lại ạ?',tip:'Xác định mục đích → chọn đúng loại BĐS và góc tiếp cận tâm lý.',key:'purpose'},
  {phase:1,phaseLabel:'P',q:'Chỗ đang ở hiện tại có điều gì anh/chị thấy chưa hài lòng không ạ?',tip:'Khơi nỗi đau hiện tại — nghe kỹ, đây là insight quan trọng nhất.',key:'current_pain'},
  {phase:1,phaseLabel:'P',q:'Việc đang thuê/ở nhờ lâu dài có làm anh/chị thấy bất an hay áp lực không ạ?',tip:'Khai thác cảm giác thiếu an toàn — tâm lý "nhà riêng" rất mạnh.',key:'insecurity'},
  {phase:1,phaseLabel:'P',q:'Điều gì khiến anh/chị chưa quyết định mua trước đây ạ?',tip:'Hiểu rào cản thật sự — pháp lý? Tài chính? Chưa tìm được căn phù hợp?',key:'barrier'},
  {phase:1,phaseLabel:'P',q:'Anh/chị có lo ngại gì về pháp lý, thị trường hay rủi ro không ạ?',tip:'Xác định mức độ nghi ngờ → chuẩn bị bằng chứng phù hợp.',key:'concerns'},
  {phase:1,phaseLabel:'P',q:'Những khu vực đã xem qua có vấn đề gì chưa phù hợp không ạ?',tip:'Hiểu lý do từ chối căn cũ → tránh lặp lại, gợi ý đúng hơn.',key:'rejected_reasons'},
  {phase:2,phaseLabel:'I',q:'Nếu tiếp tục thuê thêm 3–5 năm nữa, anh/chị nghĩ tiền thuê đó sẽ đi về đâu ạ?',tip:'Tính chi phí cơ hội — tiền thuê = tiền mất, không tích lũy tài sản.',key:'rent_cost'},
  {phase:2,phaseLabel:'I',q:'Khi các bé lớn hơn mà chưa có nhà riêng, anh/chị thấy sẽ ảnh hưởng thế nào ạ?',tip:'Khai thác lo lắng về tương lai con cái — rất hiệu quả với KH có gia đình.',key:'kids_future'},
  {phase:2,phaseLabel:'I',q:'Nếu giá BĐS khu này tăng thêm 15–20% năm sau, lúc đó anh/chị cảm thấy thế nào?',tip:'FOMO — nỗi sợ bỏ lỡ. Đừng dùng nếu KH đang nghi ngờ giá cao.',key:'price_fomo'},
  {phase:2,phaseLabel:'I',q:'Việc chưa có nhà riêng có ảnh hưởng đến kế hoạch tài chính dài hạn không ạ?',tip:'Mở rộng tầm nhìn — BĐS không chỉ là chỗ ở mà là tài sản tích lũy.',key:'financial_plan'},
  {phase:2,phaseLabel:'I',q:'Nếu đợi thêm mà lỡ mất căn phù hợp với mức giá này, anh/chị có tiếc không ạ?',tip:'Khai thác hối tiếc tiềm tàng — chỉ dùng khi KH đã thể hiện quan tâm rõ.',key:'regret'},
  {phase:3,phaseLabel:'N',q:'Nếu tìm được căn đúng khu, đúng giá, pháp lý sạch 100% — anh/chị có muốn xem ngay không ạ?',tip:'KH tự nói ra mong muốn — không phải bạn nói. Đây là tín hiệu chốt quan trọng.',key:'ideal_solution'},
  {phase:3,phaseLabel:'N',q:'Điều quan trọng nhất với anh/chị khi chọn nhà là gì — vị trí, pháp lý, giá hay không gian?',tip:'Xác định priority số 1 → dùng đúng ngôn ngữ tâm lý khi giới thiệu căn.',key:'priority'},
  {phase:3,phaseLabel:'N',q:'Nếu căn em giới thiệu đáp ứng được điều đó, anh/chị sẽ quyết định thế nào ạ?',tip:'Câu hỏi thử nghiệm quyết định — phản ứng KH cho biết họ có thật sự muốn mua.',key:'decision_readiness'},
  {phase:3,phaseLabel:'N',q:'Anh/chị muốn em hỗ trợ bước tiếp theo như thế nào — sắp lịch xem nhà hay so sánh thêm vài căn ạ?',tip:'Luôn đưa ra 2 lựa chọn — tránh câu hỏi có/không. KH chọn cái nào cũng dẫn đến hành động.',key:'next_step'}
];

const SPIN_PHASES=[
  {label:'S',name:'Situation',color:'var(--bl)',bg:'rgba(76,156,245,.15)',border:'rgba(76,156,245,.4)',count:6,desc:'Tìm hiểu tình huống'},
  {label:'P',name:'Problem',color:'var(--rd)',bg:'rgba(239,83,80,.15)',border:'rgba(239,83,80,.4)',count:5,desc:'Khơi nỗi đau'},
  {label:'I',name:'Implication',color:'var(--ac)',bg:'rgba(245,166,35,.15)',border:'rgba(245,166,35,.4)',count:5,desc:'Khoét sâu hệ quả'},
  {label:'N',name:'Need-Payoff',color:'var(--gr)',bg:'rgba(62,207,142,.15)',border:'rgba(62,207,142,.4)',count:4,desc:'Dẫn đến giải pháp'}
];

let spinState={khName:'',khId:'',phase:0,answers:{},notes:{}};

function buildSPINKHSelect(){
  loadKHList();
  const sel=document.getElementById('spin_kh');if(!sel)return;
  const allKH=[
    ...khList.map(k=>({id:'khl_'+k.id,name:k.name,phone:k.phone||''})),
    ...reminders.filter(r=>r.khName).map(r=>({id:'rem_'+r.id,name:r.khName,phone:r.phone||''}))
  ];
  const seen=new Set();
  const unique=allKH.filter(k=>{if(seen.has(k.name))return false;seen.add(k.name);return true;});
  sel.innerHTML='<option value="">-- Chọn KH --</option>'+unique.map(k=>`<option value="${k.id}" data-name="${k.name}">${k.name}${k.phone?' ('+k.phone+')':''}</option>`).join('');
  toast('✅ Đã load danh sách KH!');
}

function onSPINKHChange(){
  const sel=document.getElementById('spin_kh');if(!sel||!sel.value)return;
  const opt=sel.options[sel.selectedIndex];
  const name=opt.dataset.name||opt.textContent.split('(')[0].trim();
  document.getElementById('spin_khname').value=name;
  spinState.khName=name;spinState.khId=sel.value;
  try{const s=localStorage.getItem('bds_spin_'+sel.value);if(s){const d=JSON.parse(s);spinState.answers=d.answers||{};spinState.notes=d.notes||{};}else{spinState.answers={};spinState.notes={};}}catch(e){}
  updSPINPhaseUI();showSPINPhase(0);
}

function updSPINKHName(){spinState.khName=document.getElementById('spin_khname')?.value||'';}

function showSPINPhase(phase){
  spinState.phase=phase;
  updSPINPhaseUI();
  const ph=SPIN_PHASES[phase];
  const qs=SPIN_QUESTIONS.filter(q=>q.phase===phase);
  const el=document.getElementById('spinQArea');if(!el)return;
  el.innerHTML=`
    <div style="background:${ph.bg};border:1.5px solid ${ph.border};border-radius:11px;padding:12px 14px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
      <div>
        <div style="font-weight:800;font-size:.92rem;color:${ph.color}">${ph.label} — ${ph.name}</div>
        <div style="font-size:.73rem;color:var(--t2);margin-top:2px">${ph.desc} · ${ph.count} câu hỏi${spinState.khName?' · KH: '+spinState.khName:''}</div>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap">
        ${phase>0?`<button class="btn btn-s btn-sm" onclick="showSPINPhase(${phase-1})">← ${SPIN_PHASES[phase-1].label}</button>`:''}
        ${phase<3?`<button class="btn btn-s btn-sm" onclick="showSPINPhase(${phase+1})">${SPIN_PHASES[phase+1].label} →</button>`:''}
        <button class="btn btn-p btn-sm" onclick="buildSPINAnalysis()">🧠 Phân tích</button>
      </div>
    </div>
    ${qs.map(q=>{
      const qIdx=SPIN_QUESTIONS.indexOf(q);
      const answered=!!spinState.answers[q.key]&&spinState.answers[q.key]!=='[Bỏ qua]';
      const skipped=spinState.answers[q.key]==='[Bỏ qua]';
      return`<div class="spin-q-card${answered?' answered':''}" id="spinq_${qIdx}">
        <div class="spin-q-num">
          <span style="font-family:'Space Mono',monospace;font-weight:700;color:${ph.color}">Q${qIdx+1}</span>
          <span class="phase-tag" style="background:${ph.bg};color:${ph.color}">${ph.label}</span>
          ${answered?'<span style="color:var(--gr);font-size:.65rem">✅ Đã ghi nhận</span>':''}
          ${skipped?'<span style="color:var(--t3);font-size:.65rem">⏭️ Bỏ qua</span>':''}
        </div>
        <div class="spin-q-txt">${q.q}</div>
        <div class="spin-q-tip">💡 ${q.tip}</div>
        ${answered
          ?`<div class="spin-q-answered">${spinState.answers[q.key]}</div>
             <button class="btn btn-s btn-xs" style="margin-top:7px" onclick="editSPINAnswer('${q.key}',${qIdx})">✏️ Sửa</button>`
          :`<textarea class="spin-q-note" id="spinans_${qIdx}" placeholder="Ghi lại câu trả lời của KH..." rows="3">${skipped?'':''}</textarea>
           <div style="display:flex;gap:6px;margin-top:7px">
             <button class="btn btn-g btn-sm" onclick="saveSPINAnswer('${q.key}',${qIdx})">✅ Lưu</button>
             <button class="btn btn-s btn-xs" onclick="skipSPINQ('${q.key}',${qIdx})">⏭️ Bỏ qua</button>
           </div>`}
      </div>`;
    }).join('')}
    <div style="display:flex;justify-content:space-between;margin-top:9px;flex-wrap:wrap;gap:7px">
      <button class="btn btn-r btn-sm" onclick="resetSPINPhase(${phase})">🔄 Reset giai đoạn</button>
      <button class="btn btn-p btn-sm" onclick="buildSPINAnalysis()">🧠 Xem phân tích KH</button>
    </div>`;
}

function saveSPINAnswer(key,qIdx){
  const val=(document.getElementById('spinans_'+qIdx)?.value||'').trim();
  if(!val)return toast('⚠️ Nhập câu trả lời trước!');
  spinState.answers[key]=val;saveSPINState();updSPINPhaseUI();showSPINPhase(spinState.phase);toast('✅ Đã lưu!');
}

function editSPINAnswer(key,qIdx){
  const card=document.getElementById('spinq_'+qIdx);if(!card)return;
  const oldVal=spinState.answers[key]||'';
  const ph=SPIN_PHASES[SPIN_QUESTIONS[qIdx].phase];
  const aEl=card.querySelector('.spin-q-answered');
  if(aEl)aEl.outerHTML=`<textarea class="spin-q-note" id="spinans_${qIdx}" rows="3">${oldVal}</textarea>`;
  const btn=card.querySelector('button.btn-s');
  if(btn)btn.outerHTML=`<div style="display:flex;gap:6px;margin-top:7px"><button class="btn btn-g btn-sm" onclick="saveSPINAnswer('${key}',${qIdx})">✅ Lưu</button><button class="btn btn-r btn-xs" onclick="showSPINPhase(${spinState.phase})">✕</button></div>`;
}

function skipSPINQ(key,qIdx){spinState.answers[key]='[Bỏ qua]';saveSPINState();updSPINPhaseUI();showSPINPhase(spinState.phase);}

function resetSPINPhase(phase){
  if(!confirm('Reset giai đoạn '+SPIN_PHASES[phase].name+'?'))return;
  SPIN_QUESTIONS.filter(q=>q.phase===phase).forEach(q=>{delete spinState.answers[q.key];});
  saveSPINState();updSPINPhaseUI();showSPINPhase(phase);toast('🔄 Đã reset!');
}

function saveSPINState(){
  if(!spinState.khId)return;
  try{localStorage.setItem('bds_spin_'+spinState.khId,JSON.stringify({answers:spinState.answers,notes:spinState.notes,khName:spinState.khName,savedAt:new Date().toISOString()}));}catch(e){}
}

function updSPINPhaseUI(){
  SPIN_PHASES.forEach((ph,pi)=>{
    const qs=SPIN_QUESTIONS.filter(q=>q.phase===pi);
    const ans=qs.filter(q=>spinState.answers[q.key]&&spinState.answers[q.key]!=='[Bỏ qua]').length;
    const isDone=ans>=qs.length;const isActive=pi===spinState.phase;
    const card=document.getElementById('spinph'+pi);
    const prog=document.getElementById('spinprog'+pi);
    if(card)card.className='spin-phase'+(isActive?' active':isDone?' done':'');
    if(prog){prog.textContent=ans+'/'+qs.length;prog.style.background=isDone?'rgba(62,207,142,.2)':isActive?ph.bg.replace('.15','.25'):'var(--bg3)';prog.style.color=isDone?'var(--gr)':isActive?ph.color:'var(--t3)';}
  });
}

function buildSPINAnalysis(){
  const el=document.getElementById('spinAnalysis');if(!el)return;
  const answered=SPIN_QUESTIONS.filter(q=>spinState.answers[q.key]&&spinState.answers[q.key]!=='[Bỏ qua]');
  const pct=Math.round(answered.length/SPIN_QUESTIONS.length*100);
  const allAns=Object.values(spinState.answers).join(' ').toLowerCase();
  let psy='Si';
  if(allAns.match(/đầu tư|sinh lời|cho thuê|lợi nhuận|tăng giá/))psy='Tham';
  else if(allAns.match(/sợ|ngại|không chắc|lo lắng|rủi ro|pháp lý/))psy='Nghi ngờ';
  else if(allAns.match(/nhanh|gấp|quyết định ngay/))psy='Sân';
  else if(allAns.match(/đẳng cấp|sang|cao cấp/))psy='Ngạo mạn';
  const psyCfg=SC_PSY_CFG[psy]||SC_PSY_CFG['Si'];
  let readiness=0;
  if(spinState.answers['budget']&&spinState.answers['budget']!=='[Bỏ qua]')readiness+=20;
  if(spinState.answers['purpose']&&spinState.answers['purpose']!=='[Bỏ qua]')readiness+=15;
  if(spinState.answers['current_pain']&&spinState.answers['current_pain']!=='[Bỏ qua]')readiness+=20;
  if(spinState.answers['ideal_solution']&&!spinState.answers['ideal_solution'].includes('[Bỏ qua]'))readiness+=25;
  if(spinState.answers['next_step']&&spinState.answers['next_step'].match(/xem ngay|sắp lịch|xem nhà/i))readiness+=20;
  const rLabel=readiness>=80?'🔥 Rất cao — Chốt ngay!':readiness>=60?'⚡ Cao — Đang tiến triển':readiness>=40?'⏳ Trung bình — Cần follow-up':'❄️ Thấp — Còn đầu chặng';
  const strategyMap={
    'Tham':'Nhấn giá hời và tiềm năng sinh lời. Tính ROI cụ thể, so với gửi tiết kiệm. Tạo urgency bằng khan hiếm.',
    'Sân':'Đi thẳng vào vấn đề, không vòng vo. Báo giá và thông số ngay. Đặt lịch xem nhà sớm nhất.',
    'Si':'Khai thác cảm xúc gia đình. Vẽ hình ảnh cuộc sống tương lai. Dùng câu mental ownership khi dẫn xem nhà.',
    'Nghi ngờ':'Cung cấp bằng chứng trước khi KH hỏi. Scan sổ hồng, cam kết hoàn tiền. Đề nghị ra phòng công chứng kiểm tra.',
    'Ngạo mạn':'Tiếp cận như ngang hàng. Nhấn tính độc bản, khu dân cư chất lượng. Không giảm giá ngay — mất đẳng cấp.'
  };
  const insights=[
    {l:'💰 Ngân sách',k:'budget'},{l:'🎯 Mục đích',k:'purpose'},{l:'😤 Nỗi đau',k:'current_pain'},
    {l:'🚧 Rào cản',k:'barrier'},{l:'⭐ Ưu tiên số 1',k:'priority'},{l:'👣 Bước tiếp',k:'next_step'}
  ].filter(i=>spinState.answers[i.k]&&spinState.answers[i.k]!=='[Bỏ qua]');

  el.style.display='block';
  el.innerHTML=`
    <div style="background:linear-gradient(135deg,rgba(156,110,245,.12),rgba(62,207,142,.08));border:1.5px solid rgba(156,110,245,.4);border-radius:12px;padding:15px 16px;margin-bottom:12px">
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:9px;margin-bottom:13px">
        <div>
          <div style="font-weight:800;font-size:.95rem;color:var(--pu)">🧠 Phân tích SPIN — ${spinState.khName||'KH'}</div>
          <div style="font-size:.72rem;color:var(--t2);margin-top:2px">${answered.length}/${SPIN_QUESTIONS.length} câu · ${pct}% hoàn thành</div>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <button class="btn btn-g btn-sm" onclick="cpTxt(buildSPINReport())">📋 Copy</button>
          <button class="btn btn-b btn-sm" onclick="addSPINToTimeline()">📋 → Timeline</button>
          <button class="btn btn-r btn-sm" onclick="document.getElementById('spinAnalysis').style.display='none'">✕</button>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;text-align:center">
        <div style="background:rgba(0,0,0,.15);border-radius:9px;padding:10px">
          <div style="font-size:1.4rem;font-weight:900;color:${readiness>=70?'var(--gr)':readiness>=40?'var(--ac)':'var(--rd)'}">${readiness}%</div>
          <div style="font-size:.62rem;color:var(--t3);margin-top:2px">Sẵn sàng mua</div>
        </div>
        <div style="background:rgba(0,0,0,.15);border-radius:9px;padding:10px">
          <div style="font-size:1.4rem">${psyCfg.e}</div>
          <div style="font-size:.7rem;font-weight:700;color:${psyCfg.c}">${psy}</div>
          <div style="font-size:.6rem;color:var(--t3)">Tâm lý KH</div>
        </div>
        <div style="background:rgba(0,0,0,.15);border-radius:9px;padding:10px">
          <div style="font-size:.78rem;font-weight:800;color:${readiness>=70?'var(--gr)':readiness>=40?'var(--ac)':'var(--rd)'};line-height:1.3">${rLabel.split('—')[0]}</div>
          <div style="font-size:.6rem;color:var(--t3);margin-top:1px">${rLabel.split('—')[1]||''}</div>
        </div>
      </div>
    </div>
    <div class="card" style="margin-bottom:10px">
      <div class="ctit"><span class="dot"></span>💡 Key Insights</div>
      <div style="display:grid;gap:6px">
        ${insights.map(i=>`<div style="display:flex;gap:9px;padding:7px 10px;background:var(--bg3);border-radius:8px;border-left:3px solid var(--ac)">
          <span style="font-size:.72rem;font-weight:700;color:var(--ac);flex-shrink:0;min-width:105px">${i.l}</span>
          <span style="font-size:.73rem;color:var(--t2);line-height:1.5">${spinState.answers[i.k]}</span>
        </div>`).join('')}
      </div>
    </div>
    <div class="card" style="margin-bottom:10px;border-color:${psyCfg.border||'rgba(245,166,35,.3)'}">
      <div class="ctit"><span class="dot" style="background:${psyCfg.c}"></span>🎯 Chiến thuật — Tâm lý ${psy} ${psyCfg.e}</div>
      <div style="background:${psyCfg.bg};border-radius:9px;padding:11px 13px;font-size:.77rem;color:var(--t2);line-height:1.7">${strategyMap[psy]||''}</div>
      ${readiness>=70?`<div style="margin-top:9px;background:rgba(239,83,80,.1);border:1px solid rgba(239,83,80,.3);border-radius:8px;padding:9px 12px;font-size:.77rem;color:var(--rd);font-weight:700">🔥 KH sẵn sàng cao — Đề nghị xem nhà hoặc đặt cọc ngay hôm nay!</div>`:''}
    </div>
    <div class="card">
      <div class="ctit"><span class="dot"></span>📋 Tất cả câu trả lời</div>
      ${SPIN_QUESTIONS.filter(q=>spinState.answers[q.key]&&spinState.answers[q.key]!=='[Bỏ qua]').map(q=>{
        const ph=SPIN_PHASES[q.phase];
        return`<div style="margin-bottom:8px;padding-bottom:8px;border-bottom:1px solid var(--border)">
          <div style="display:flex;gap:6px;align-items:center;margin-bottom:3px">
            <span style="font-size:.6rem;font-weight:700;padding:1px 6px;border-radius:6px;background:${ph.bg};color:${ph.color}">${ph.label}</span>
            <span style="font-size:.71rem;color:var(--t2)">${q.q}</span>
          </div>
          <div style="font-size:.75rem;color:var(--tx);font-style:italic;padding:5px 9px;background:var(--bg3);border-radius:6px">${spinState.answers[q.key]}</div>
        </div>`;
      }).join('')}
    </div>`;
  el.scrollIntoView({behavior:'smooth',block:'nearest'});
}

function buildSPINReport(){
  const line='='.repeat(46);
  let r=`SPIN SELLING — KHÁM PHÁ KH\n${line}\nKH: ${spinState.khName||'—'}\nNgày: ${new Date().toLocaleString('vi-VN')}\n${line}\n\n`;
  SPIN_PHASES.forEach((ph,pi)=>{
    r+=`[${ph.label}] ${ph.name} — ${ph.desc}\n${'─'.repeat(30)}\n`;
    SPIN_QUESTIONS.filter(q=>q.phase===pi&&spinState.answers[q.key]&&spinState.answers[q.key]!=='[Bỏ qua]').forEach(q=>{r+=`Q: ${q.q}\nA: ${spinState.answers[q.key]}\n\n`;});
  });
  r+=`${line}\nAUTO PRO CONTENT BĐS v7 · #aihockiemtien`;
  return r;
}

function addSPINToTimeline(){
  if(!spinState.khId)return toast('⚠️ Chọn KH trước!');
  loadKHList();
  const kh=khList.find(k=>'khl_'+k.id===spinState.khId);
  if(kh){
    if(!kh.interactions)kh.interactions=[];
    kh.interactions.push({type:'🔄',typeLabel:'SPIN Selling — Khám phá KH',
      note:`Nỗi đau: ${spinState.answers['current_pain']||'—'} · Ưu tiên: ${spinState.answers['priority']||'—'} · Bước tiếp: ${spinState.answers['next_step']||'—'}`,
      time:new Date().toISOString()});
    saveKHList();toast('✅ Đã lưu vào Timeline KH!');
  }else toast('⚠️ KH không có trong KH Labels!');
}

// ── Update buildHomeFeatures to include sixcan ──
// (already included in previous buildHomeFeatures update)
const CK_ITEMS=[
  // Nhóm KH & Follow-up
  {g:'📞 KH & Follow-up',txt:'Xem danh sách nhắc lịch hôm nay',sub:'Ai đến hạn follow-up? Gọi ngay trước 9:00!'},
  {g:'📞 KH & Follow-up',txt:'Gọi/nhắn KH nóng đang chờ phản hồi',sub:'KH đỏ = ưu tiên số 1 mỗi sáng'},
  {g:'📞 KH & Follow-up',txt:'Cập nhật nhãn KH nóng/ấm/lạnh',sub:'Review lại sau tương tác hôm qua'},
  {g:'📞 KH & Follow-up',txt:'Ghi lại tương tác mới vào timeline KH',sub:'Không để quên thông tin quan trọng'},
  // Nhóm BĐS
  {g:'🏠 BĐS & Khảo Sát',txt:'Kiểm tra tin mới từ chủ nhà/đồng nghiệp',sub:'Có căn nào mới phù hợp KH đang cần?'},
  {g:'🏠 BĐS & Khảo Sát',txt:'Xem lịch xem nhà hôm nay — chuẩn bị hồ sơ',sub:'In/lưu sẵn thông tin căn, kịch bản dẫn xem'},
  {g:'🏠 BĐS & Khảo Sát',txt:'Kiểm tra mã căn còn chờ đăng trong CRM',sub:'Đừng để tin hay mà không đăng'},
  // Nhóm Content
  {g:'✍️ Content & Đăng Tin',txt:'Đăng bài theo lịch 7 ngày đã lên kế hoạch',sub:'Giờ vàng: 8:00 sáng và 8:00 tối'},
  {g:'✍️ Content & Đăng Tin',txt:'Check tương tác bài đăng hôm qua',sub:'Reply comment, inbox — phản hồi trong 1h'},
  {g:'✍️ Content & Đăng Tin',txt:'Tạo 1 content mới nếu có tin BĐS mới',sub:'Dùng app tạo content < 5 phút'},
  // Nhóm Phát triển bản thân
  {g:'📈 Phát Triển & Kỷ Luật',txt:'Đặt 3 ưu tiên công việc quan trọng nhất hôm nay',sub:'Không làm đủ 3 cái này = ngày chưa thành công'},
  {g:'📈 Phát Triển & Kỷ Luật',txt:'Đọc/nghe 15 phút kiến thức BĐS hoặc sales',sub:'Cẩm nang Bách Thắng, podcast, bài viết chuyên ngành'},
  {g:'📈 Phát Triển & Kỷ Luật',txt:'Review mục tiêu tháng — đang ở đâu?',sub:'Bao nhiêu deal? Còn bao nhiêu ngày? Cần tăng tốc không?'},
  {g:'📈 Phát Triển & Kỷ Luật',txt:'Uống đủ nước, ăn sáng, sẵn sàng chiến đấu 💪',sub:'Sức khoẻ là nền tảng của mọi thành công'},
];

let ckState={};  // {date: {idx: bool}}
let ckStreak=0;

function getCKDate(){return new Date().toISOString().split('T')[0];}

function loadCKState(){
  try{const s=localStorage.getItem('bds_ck');if(s){const d=JSON.parse(s);ckState=d.state||{};ckStreak=d.streak||0;}}catch(e){}
}
function saveCKState(){
  try{localStorage.setItem('bds_ck',JSON.stringify({state:ckState,streak:ckStreak,lastSave:new Date().toISOString()}));}catch(e){}
}

function buildMorningChecklist(){
  loadCKState();
  const today=getCKDate();
  if(!ckState[today])ckState[today]={};

  // Date display
  const dtEl=document.getElementById('ckDateTxt');
  if(dtEl){const d=new Date();dtEl.textContent=d.toLocaleDateString('vi-VN',{weekday:'long',year:'numeric',month:'long',day:'numeric'});}

  // Group items
  const groups={};
  CK_ITEMS.forEach((item,i)=>{if(!groups[item.g])groups[item.g]=[];groups[item.g].push({...item,idx:i});});

  const el=document.getElementById('ckList');if(!el)return;
  el.innerHTML=Object.entries(groups).map(([g,items])=>`
    <div class="ck-group">
      <div class="ck-glbl">${g}</div>
      ${items.map(item=>{
        const done=!!ckState[today][item.idx];
        return`<div class="ck-item${done?' done':''}" id="cki_${item.idx}" onclick="toggleCK(${item.idx})">
          <div class="ck-box" id="ckb_${item.idx}">${done?'✓':''}</div>
          <div style="flex:1">
            <div class="ck-txt">${item.txt}</div>
            <div class="ck-sub">${item.sub}</div>
          </div>
        </div>`;
      }).join('')}
    </div>`).join('');
  updCKProgress();
}

function toggleCK(idx){
  const today=getCKDate();
  if(!ckState[today])ckState[today]={};
  ckState[today][idx]=!ckState[today][idx];
  const el=document.getElementById('cki_'+idx);
  const cb=document.getElementById('ckb_'+idx);
  if(el)el.classList.toggle('done',ckState[today][idx]);
  if(cb)cb.textContent=ckState[today][idx]?'✓':'';
  updCKProgress();
  saveCKState();
  if(ckState[today][idx])toast('✅ Xong!');
}

function updCKProgress(){
  const today=getCKDate();
  const done=Object.values(ckState[today]||{}).filter(Boolean).length;
  const total=CK_ITEMS.length;
  const pct=Math.round(done/total*100);
  const pb=document.getElementById('ckPbar');if(pb)pb.style.width=pct+'%';
  const pt=document.getElementById('ckPctTxt');if(pt)pt.textContent=pct+'%';
  // Update streak if done >= 80%
  if(pct>=80){
    const yesterday=new Date();yesterday.setDate(yesterday.getDate()-1);
    const yStr=yesterday.toISOString().split('T')[0];
    const yDone=Object.values(ckState[yStr]||{}).filter(Boolean).length;
    const yPct=Math.round(yDone/total*100);
    if(yPct>=80||ckStreak===0){}
    // streak managed in saveCKState
  }
  updCKBadge();
  const sk=document.getElementById('ckStreakTxt');
  if(sk)sk.textContent=`Streak: ${ckStreak} ngày liên tiếp${ckStreak>=3?' 🔥':''}${ckStreak>=7?' 🏆':''}`;
}

function updCKBadge(){
  const today=getCKDate();
  loadCKState();
  const done=Object.values(ckState[today]||{}).filter(Boolean).length;
  const total=CK_ITEMS.length;
  const bd=document.getElementById('ckBadge');
  if(bd){bd.textContent=done+'/'+total;bd.style.background=done===total?'var(--gr)':done>0?'var(--ac)':'var(--border)';}
}

function ckCheckAll(){
  const today=getCKDate();
  if(!ckState[today])ckState[today]={};
  CK_ITEMS.forEach((_,i)=>ckState[today][i]=true);
  ckStreak++;saveCKState();buildMorningChecklist();toast('🏆 Tuyệt vời! Hoàn thành toàn bộ checklist!');
}

function ckReset(){
  if(!confirm('Reset checklist hôm nay?'))return;
  const today=getCKDate();ckState[today]={};saveCKState();buildMorningChecklist();toast('🔄 Đã reset!');
}

// Auto-reset check
function checkCKReset(){
  const now=new Date();
  const h=now.getHours();const m=now.getMinutes();
  if(h===6&&m===0){
    const today=getCKDate();
    // Update streak before reset
    const yesterday=new Date(now);yesterday.setDate(yesterday.getDate()-1);
    const yStr=yesterday.toISOString().split('T')[0];
    const yDone=Object.values(ckState[yStr]||{}).filter(Boolean).length;
    if(Math.round(yDone/CK_ITEMS.length*100)>=80)ckStreak++;
    else ckStreak=0;
    saveCKState();
  }
  setTimeout(checkCKReset,60000);
}

// ===================== 2. KH LABELS =====================
// (khList đã khai báo ở STATE section phía trên)

function loadKHList(){try{const s=localStorage.getItem('bds_khl');if(s)khList=JSON.parse(s);}catch(e){}}
function saveKHList(){try{localStorage.setItem('bds_khl',JSON.stringify(khList));}catch(e){}}

const KHL_CFG={
  hot:{e:'🔴',lbl:'Nóng',cls:'lbl-hot',desc:'Đang muốn mua ngay'},
  warm:{e:'🟡',lbl:'Ấm',cls:'lbl-warm',desc:'Đang cân nhắc'},
  cold:{e:'⚫',lbl:'Lạnh',cls:'lbl-cold',desc:'Chưa rõ nhu cầu'},
  done:{e:'✅',lbl:'Đã chốt',cls:'lbl-done',desc:'Deal thành công'}
};

let khlFilter='all';

function addKHLabel(){
  const name=V('khl_name'),phone=V('khl_phone'),prop=V('khl_prop'),label=document.getElementById('khl_label')?.value||'warm',note=V('khl_note');
  if(!name)return toast('⚠️ Nhập tên KH!');
  loadKHList();
  khList.unshift({id:Date.now(),name,phone,prop,label,note,created:new Date().toLocaleString('vi-VN'),interactions:[]});
  saveKHList();buildKHLabels();
  ['khl_name','khl_phone','khl_prop','khl_note'].forEach(id=>{const e=document.getElementById(id);if(e)e.value='';});
  toast(`✅ Đã thêm KH: ${name}`);
}

function filterKHLabel(f,el){
  khlFilter=f;
  document.querySelectorAll('#pg-khlabels .pill').forEach(p=>p.classList.remove('on'));
  if(el)el.classList.add('on');
  buildKHLabels();
}

function buildKHLabels(){
  loadKHList();
  // Stats
  ['hot','warm','cold','done'].forEach(k=>{const el=document.getElementById('klStat_'+k);if(el)el.textContent=khList.filter(x=>x.label===k).length;});
  const list=khlFilter==='all'?khList:khList.filter(x=>x.label===khlFilter);
  const el=document.getElementById('khLabelList');if(!el)return;
  if(!list.length){el.innerHTML=`<div style="text-align:center;padding:28px;color:var(--t3);font-size:.8rem">Chưa có KH nào${khlFilter!=='all'?' trong nhóm này':''}.<br>Thêm KH ở form bên trên!</div>`;return;}
  el.innerHTML=list.map((kh,i)=>{
    const cfg=KHL_CFG[kh.label]||KHL_CFG.warm;
    const oi=khList.indexOf(kh);
    return`<div style="background:var(--card);border:1px solid var(--border);border-radius:11px;padding:13px 14px;margin-bottom:9px;transition:.2s" onmouseover="this.style.borderColor='rgba(245,166,35,.3)'" onmouseout="this.style.borderColor='var(--border)'">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:10px;flex-wrap:wrap">
        <div style="flex:1;min-width:160px">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px">
            <div style="font-weight:800;font-size:.88rem;color:var(--tx)">${kh.name}</div>
            <span class="kh-label ${cfg.cls}">${cfg.e} ${cfg.lbl}</span>
          </div>
          ${kh.phone?`<div style="font-size:.73rem;color:var(--t2);margin-bottom:3px">📞 ${kh.phone}</div>`:''}
          ${kh.prop?`<div style="font-size:.73rem;color:var(--t2);margin-bottom:3px">🏠 ${kh.prop}</div>`:''}
          ${kh.note?`<div style="font-size:.71rem;color:var(--t3);background:var(--bg3);border-radius:6px;padding:4px 8px;margin-top:5px">📝 ${kh.note}</div>`:''}
          <div style="font-size:.65rem;color:var(--t3);margin-top:5px">🕐 ${kh.created}</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:5px;flex-shrink:0">
          <select onchange="changeKHLabel(${oi},this.value)" style="font-size:.68rem;padding:3px 6px;border-radius:6px;background:var(--bg3);border:1px solid var(--border);color:var(--t2)">
            ${Object.entries(KHL_CFG).map(([k,c])=>`<option value="${k}" ${kh.label===k?'selected':''}>${c.e} ${c.lbl}</option>`).join('')}
          </select>
          <button class="btn btn-s btn-xs" onclick="nav('timeline');setTimeout(()=>{document.getElementById('tlKHSelect').value='${kh.id}';loadTimeline();},100)">📋 Timeline</button>
          <button class="btn btn-s btn-xs" onclick="cpTxt('${kh.phone||''}')">📋 SĐT</button>
          <button class="btn btn-r btn-xs" onclick="delKHLabel(${oi})">🗑️</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

function changeKHLabel(i,val){
  loadKHList();khList[i].label=val;saveKHList();buildKHLabels();
  toast(`✅ Cập nhật: ${KHL_CFG[val].e} ${KHL_CFG[val].lbl}`);
}

function delKHLabel(i){
  if(!confirm('Xóa KH này?'))return;
  loadKHList();khList.splice(i,1);saveKHList();buildKHLabels();toast('🗑️ Đã xóa!');
}

// ===================== 3. INTERACTION TIMELINE =====================
function buildTLSelect(){
  loadKHList();
  const sel=document.getElementById('tlKHSelect');if(!sel)return;
  const cur=sel.value;
  sel.innerHTML='<option value="">-- Chọn KH --</option>'+
    khList.map(kh=>`<option value="${kh.id}" ${String(kh.id)===String(cur)?'selected':''}>${KHL_CFG[kh.label]?.e||''} ${kh.name}${kh.phone?' ('+kh.phone+')':''}</option>`).join('');
  if(cur)loadTimeline();
}

function loadTimeline(){
  loadKHList();
  const sel=document.getElementById('tlKHSelect');if(!sel)return;
  const id=sel.value;
  const addForm=document.getElementById('tlAddForm');
  const disp=document.getElementById('tlDisplay');
  if(!id){if(addForm)addForm.style.display='none';if(disp)disp.innerHTML='';return;}
  if(addForm)addForm.style.display='block';
  // Set default datetime to now
  const tn=document.getElementById('tl_time');
  if(tn&&!tn.value){const n=new Date();n.setMinutes(n.getMinutes()-n.getTimezoneOffset());tn.value=n.toISOString().slice(0,16);}
  renderTimeline(id);
}

function renderTimeline(khId){
  loadKHList();
  const kh=khList.find(k=>String(k.id)===String(khId));
  const el=document.getElementById('tlDisplay');if(!el)return;
  if(!kh){el.innerHTML='';return;}
  const cfg=KHL_CFG[kh.label]||KHL_CFG.warm;
  const items=(kh.interactions||[]).slice().sort((a,b)=>new Date(b.time)-new Date(a.time));
  const typeColors={'📞':'var(--bl)','💬':'var(--gr)','🏠':'var(--ac)','🤝':'var(--pu)','📧':'var(--t2)','💰':'var(--rd)','📋':'var(--pk)','✅':'var(--gr)'};
  el.innerHTML=`
    <div style="background:var(--card);border:1px solid var(--border);border-radius:11px;padding:13px 14px;margin-bottom:11px;display:flex;align-items:center;gap:11px">
      <div style="width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,var(--ac),var(--a2));display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0">👤</div>
      <div style="flex:1">
        <div style="font-weight:800;font-size:.9rem;color:var(--tx)">${kh.name}</div>
        <div style="font-size:.72rem;color:var(--t2);margin-top:2px">${kh.phone||''} ${kh.prop?'· 🏠 '+kh.prop:''}</div>
      </div>
      <span class="kh-label ${cfg.cls}">${cfg.e} ${cfg.lbl}</span>
    </div>
    ${items.length?`<div style="padding:4px 0">
      ${items.map((it,i)=>`
        <div class="tl-item">
          <div class="tl-left">
            <div class="tl-dot" style="background:rgba(0,0,0,.05);border-color:${typeColors[it.type]||'var(--border)'}">${it.type}</div>
            ${i<items.length-1?'<div class="tl-line"></div>':''}
          </div>
          <div class="tl-body">
            <div class="tl-meta">
              <span style="font-weight:700;color:var(--tx);font-size:.76rem">${it.typeLabel||it.type}</span>
              <span>·</span>
              <span>${new Date(it.time).toLocaleString('vi-VN')}</span>
              <button style="background:none;border:none;color:var(--rd);cursor:pointer;font-size:.65rem;margin-left:4px" onclick="delInteraction('${khId}',${i})">🗑️</button>
            </div>
            <div class="tl-note">${it.note||'—'}</div>
          </div>
        </div>`).join('')}
    </div>`
    :`<div class="tl-add" onclick="document.getElementById('tlAddForm').scrollIntoView({behavior:'smooth'})">+ Thêm tương tác đầu tiên với ${kh.name}</div>`}`;
}

function addInteraction(){
  const sel=document.getElementById('tlKHSelect');if(!sel||!sel.value)return toast('⚠️ Chọn KH trước!');
  const typeEl=document.getElementById('tl_type');
  const type=typeEl?.value||'📞';
  const typeLabel=typeEl?.options[typeEl.selectedIndex]?.text||type;
  const note=V('tl_note');const time=document.getElementById('tl_time')?.value||new Date().toISOString();
  if(!note)return toast('⚠️ Nhập nội dung tương tác!');
  loadKHList();
  const kh=khList.find(k=>String(k.id)===String(sel.value));
  if(!kh)return;
  if(!kh.interactions)kh.interactions=[];
  kh.interactions.push({type,typeLabel,note,time});
  saveKHList();
  document.getElementById('tl_note').value='';
  renderTimeline(sel.value);
  toast('✅ Đã lưu tương tác!');
}

function delInteraction(khId,idx){
  if(!confirm('Xóa tương tác này?'))return;
  loadKHList();
  const kh=khList.find(k=>String(k.id)===String(khId));
  if(!kh||!kh.interactions)return;
  const sorted=kh.interactions.slice().sort((a,b)=>new Date(b.time)-new Date(a.time));
  const item=sorted[idx];
  kh.interactions=kh.interactions.filter(x=>x!==item);
  saveKHList();renderTimeline(khId);toast('🗑️ Đã xóa!');
}

// ===================== 4. CALENDAR =====================
let calYear=new Date().getFullYear();
let calMonth=new Date().getMonth();

function calNav(dir){calMonth+=dir;if(calMonth>11){calMonth=0;calYear++;}if(calMonth<0){calMonth=11;calYear--;}buildCalendar();}

function buildCalendar(){
  const now=new Date();
  const todayStr=now.toISOString().split('T')[0];
  // Title
  const tEl=document.getElementById('calTitle');
  if(tEl)tEl.textContent=`Tháng ${calMonth+1}/${calYear}`;
  // Build content map from contentLog + crm posted dates
  const contentMap={};// date -> {count, platforms[]}
  // From contentLog
  contentLog.forEach(c=>{
    if(!contentMap[c.date])contentMap[c.date]={count:0,plts:[]};
    contentMap[c.date].count++;
  });
  // From crm posted times
  crm.forEach(e=>{
    if(e.postedTimes){
      Object.entries(e.postedTimes).forEach(([plt,t])=>{
        if(!t)return;
        // Parse date from time string (vi-VN locale)
        try{
          // Try to get date from postedTimes string
          const d=new Date(t.replace(/(\d+)\/(\d+)\/(\d+)/,'$3-$2-$1'));
          if(!isNaN(d)){
            const ds=d.toISOString().split('T')[0];
            if(!contentMap[ds])contentMap[ds]={count:0,plts:[]};
            if(!contentMap[ds].plts.includes(plt))contentMap[ds].plts.push(plt);
          }
        }catch(e2){}
      });
    }
  });
  // Build calendar grid
  const firstDay=new Date(calYear,calMonth,1).getDay();// 0=Sun
  const daysInMonth=new Date(calYear,calMonth+1,0).getDate();
  const daysInPrev=new Date(calYear,calMonth,0).getDate();
  const el=document.getElementById('calDays');if(!el)return;
  let html='';
  // Prev month days
  for(let i=firstDay-1;i>=0;i--){
    html+=`<div class="cal-day other-month"><div class="cal-dn" style="color:var(--t3)">${daysInPrev-i}</div></div>`;
  }
  // Current month
  let monthPosts=0;let streak=0;let maxStreak=0;let curStreak=0;let daysWithContent=0;
  for(let d=1;d<=daysInMonth;d++){
    const ds=`${calYear}-${String(calMonth+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const isToday=ds===todayStr;
    const data=contentMap[ds];
    if(data){daysWithContent++;monthPosts+=data.count;curStreak++;maxStreak=Math.max(maxStreak,curStreak);}
    else curStreak=0;
    if(ds===todayStr)streak=curStreak;
    const dots=(data?.plts||[]).map(p=>`<div class="cal-dot ${p}"></div>`).join('');
    const countBadge=data?.count>0?`<div style="font-size:.55rem;color:var(--gr);font-weight:700">${data.count}</div>`:'';
    html+=`<div class="cal-day${data?' has-content':''}${isToday?' today':''}" onclick="showCalDay('${ds}')">
      <div class="cal-dn">${d}</div>
      ${dots?`<div class="cal-dots">${dots}</div>`:''}
      ${countBadge}
    </div>`;
  }
  // Fill remaining
  const remaining=(7-((firstDay+daysInMonth)%7))%7;
  for(let i=1;i<=remaining;i++){
    html+=`<div class="cal-day other-month"><div class="cal-dn" style="color:var(--t3)">${i}</div></div>`;
  }
  el.innerHTML=html;
  // Stats
  const s1=document.getElementById('calStatDays');if(s1)s1.textContent=daysWithContent;
  const s2=document.getElementById('calStatPosts');if(s2)s2.textContent=monthPosts;
  const s3=document.getElementById('calStatStreak');if(s3)s3.textContent=streak;
  const s4=document.getElementById('calStatBest');if(s4)s4.textContent=maxStreak;
}

function showCalDay(ds){
  const el=document.getElementById('calDayDetail');if(!el)return;
  const d=new Date(ds);
  const label=d.toLocaleDateString('vi-VN',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
  // Find content on this day
  const logs=contentLog.filter(c=>c.date===ds);
  const posted=crm.filter(e=>{
    if(!e.postedTimes)return false;
    return Object.values(e.postedTimes).some(t=>{
      if(!t)return false;
      try{const pd=new Date(t.replace(/(\d+)\/(\d+)\/(\d+)/,'$3-$2-$1'));return pd.toISOString().split('T')[0]===ds;}catch(e2){return false;}
    });
  });
  if(!logs.length&&!posted.length){el.style.display='none';return;}
  el.style.display='block';
  el.innerHTML=`<div class="card" style="border-color:rgba(245,166,35,.35)">
    <div class="ctit"><span class="dot"></span>📅 ${label}</div>
    ${logs.length?`<div style="margin-bottom:9px"><div style="font-size:.71rem;font-weight:700;color:var(--tx);margin-bottom:6px">✍️ Đã tạo ${logs.length} content</div>
    ${logs.map(l=>`<div style="font-size:.73rem;color:var(--t2);padding:4px 0;border-bottom:1px solid var(--border)">🏠 ${l.type} ${l.loc} ${l.price}</div>`).join('')}</div>`:''}
    ${posted.length?`<div><div style="font-size:.71rem;font-weight:700;color:var(--tx);margin-bottom:6px">📌 Đã đăng ${posted.length} tin</div>
    ${posted.map(e=>{const plts=Object.entries(e.postedTimes||{}).filter(([k,v])=>v).map(([k])=>({fb:'📘',zalo:'💬',tiktok:'🎵',web:'🌐'}[k]||k)).join(' ');return`<div style="font-size:.73rem;color:var(--t2);padding:4px 0;border-bottom:1px solid var(--border)">${plts} ${e.type} ${e.loc} ${e.price} <span style="font-family:'Space Mono',monospace;font-size:.62rem;color:var(--ac)">${e.code||''}</span></div>`}).join('')}</div>`:''}
    <button class="btn btn-r btn-xs" style="margin-top:9px" onclick="document.getElementById('calDayDetail').style.display='none'">✕ Đóng</button>
  </div>`;
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
