// ==========================================
// GLOBAL VARIABLES
// ==========================================

let currentSlideIndex = 0;
let isTransitioning = false;
let loadingProgress = 0;
let isDarkMode = true;
let autoPlayInterval = null;
let touchStartX = 0;
let touchEndX = 0;
// ==========================================
// SLIDE DATA
// ==========================================

const slidesData = [
    // Slide 1: Title
    {
        type: 'title',
        title: 'أبو عمرو البصري ورواته',
        subtitle: 'أصول قراءتهم وضوابطها',
        content: ''
    },
    
    // Slide 2: Introduction
    {
        type: 'content',
        title: 'من هو أبو عمرو البصري؟',
        subtitle: 'الاسم والنسب',
        content: `
            <ul class="content-list">
                <li><strong><i class="fas fa-user"></i> الاسم:</strong> زبّان بن العلاء بن عمار بن العريان</li>
                <li><strong><i class="fas fa-users"></i> النسب:</strong> التميمي المازني البصري</li>
                <li><strong><i class="fas fa-tag"></i> الكنية:</strong> أبو عمرو</li>
                <li><strong><i class="fas fa-map-marker-alt"></i> النسبة:</strong> البصري (نسبة إلى البصرة)</li>
                <li><strong><i class="fas fa-crown"></i> اللقب:</strong> صريح النسب في العرب</li>
            </ul>
        `
    },
    
    // Slide 3: Birth and upbringing
    {
        type: 'content',
        title: 'مولده ونشأته',
        subtitle: 'حياة إمام من أئمة القراءات',
        content: `
            <div class="grid-layout">
                <div class="grid-item">
                    <h3><i class="fas fa-map-marked-alt"></i> مكان الولادة</h3>
                    <p>مكة المكرمة - البلد الحرام</p>
                </div>
                <div class="grid-item">
                    <h3><i class="fas fa-calendar-alt"></i> سنة الولادة</h3>
                    <p>68 هـ (في عهد عبد الملك بن مروان)</p>
                </div>
                <div class="grid-item">
                    <h3><i class="fas fa-home"></i> النشأة</h3>
                    <p>نشأ في البصرة وتعلم فيها</p>
                </div>
                <div class="grid-item">
                    <h3><i class="fas fa-star"></i> الوفاة</h3>
                    <p>الكوفة سنة 154 هـ</p>
                </div>
            </div>
            <div class="highlight-box mt-3">
                <h3><i class="fas fa-hourglass-half"></i> العمر</h3>
                <p>عاش 86 سنة تقريباً في خدمة القرآن الكريم</p>
            </div>
        `
    },
    
    // Slide 4: Teachers
    {
        type: 'content',
        title: 'شيوخه وأسانيده',
        subtitle: 'أبرز من أخذ عنهم',
        content: `
            <div class="grid-layout">
                <div class="grid-item">
                    <h3><i class="fas fa-users color-gold"></i> من الصحابة</h3>
                    <p style="font-size: 1.3rem; font-weight: 700; color: var(--primary-color);">أنس بن مالك رضي الله عنه</p>
                    <p style="margin-top: 10px;">خادم رسول الله ﷺ</p>
                </div>
                <div class="grid-item">
                    <h3><i class="fas fa-user-graduate color-gold"></i> من التابعين</h3>
                    <ul class="content-list" style="margin: 0;">
                        <li>الحسن البصري</li>
                        <li>سعيد بن جبير</li>
                        <li>مجاهد بن جبر</li>
                        <li>عاصم بن أبي النجود</li>
                        <li>ابن كثير المكي</li>
                        <li>نافع المدني</li>
                    </ul>
                </div>
            </div>
            <div class="quote-box">
                <i class="fas fa-quote-right"></i>
                أخذ القراءة من أكثر من ستين شيخاً من التابعين
            </div>
        `
    },
    
    // Slide 5: Status
    {
        type: 'content',
        title: 'مكانته العلمية',
        subtitle: 'إمام متعدد المواهب',
        content: `
            <div class="grid-layout">
                <div class="grid-item">
                    <h3><i class="fas fa-book-quran color-gold"></i> القراءات</h3>
                    <p>إمام القراءة في عصره بلا منازع</p>
                </div>
                <div class="grid-item">
                    <h3><i class="fas fa-language color-gold"></i> النحو واللغة</h3>
                    <p>من مؤسسي المدرسة البصرية النحوية</p>
                </div>
                <div class="grid-item">
                    <h3><i class="fas fa-pen-fancy color-gold"></i> الشعر وأيام العرب</h3>
                    <p>عالم بأشعار العرب وأيامهم</p>
                </div>
                <div class="grid-item">
                    <h3><i class="fas fa-check-circle color-gold"></i> الحديث</h3>
                    <p>ثقة عدل في الرواية</p>
                </div>
            </div>
            <div class="quote-box mt-3">
                <i class="fas fa-quote-right"></i>
                "أبو عمرو أعلم الناس بالقراءات والعربية وأيام العرب والشعر" - أبو عبيدة
            </div>
        `
    },
    
    // Slide 6: Piety
    {
        type: 'content',
        title: 'زهده وورعه',
        subtitle: 'من مظاهر تقواه',
        content: `
            <ul class="content-list">
                <li><strong><i class="fas fa-mosque"></i> العبادة:</strong> كان يختم القرآن كل ثلاث ليالٍ</li>
                <li><strong><i class="fas fa-book"></i> التنسك:</strong> كانت كتبه تملأ بيتاً إلى السقف ثم أحرقها تنسكاً وزهداً</li>
                <li><strong><i class="fas fa-gem"></i> الخاتم:</strong> نقش على خاتمه حكمة بليغة</li>
            </ul>
            <div class="quote-box">
                <i class="fas fa-quote-right"></i>
                "وإن امرأ دنياه أكبر همه ... لمستمسك منها بحبل غرور"
            </div>
            <div class="highlight-box mt-3">
                <h3><i class="fas fa-star color-gold"></i> من كراماته</h3>
                <p>قصة العين التي فُجرت له في الصحراء بإذن الله</p>
            </div>
        `
    },
    
    // Slide 7: Students
    {
        type: 'content',
        title: 'تلاميذه',
        subtitle: 'من أشهر من أخذ عنه',
        content: `
            <div class="highlight-box mb-3">
                <h3><i class="fas fa-star color-gold"></i> الراوي الأساسي</h3>
                <p style="font-size: 1.8rem; font-weight: 700;">يحيى بن المبارك اليزيدي</p>
                <p>(ت 202 هـ)</p>
            </div>
            <div class="grid-layout">
                <div class="grid-item">
                    <h3><i class="fas fa-graduation-cap"></i> علماء النحو</h3>
                    <ul class="content-list" style="margin: 0;">
                        <li>سيبويه (إمام النحاة)</li>
                        <li>يونس بن حبيب</li>
                    </ul>
                </div>
                <div class="grid-item">
                    <h3><i class="fas fa-pen"></i> علماء اللغة</h3>
                    <ul class="content-list" style="margin: 0;">
                        <li>الأصمعي (إمام اللغة)</li>
                        <li>أبو زيد الأنصاري</li>
                    </ul>
                </div>
            </div>
        `
    },
    
    // Slide 8: Methodology
    {
        type: 'content',
        title: 'منهجه في القراءة',
        subtitle: 'ضوابط صارمة ومحكمة',
        content: `
            <ul class="content-list">
                <li><strong><i class="fas fa-check-double color-gold"></i> الالتزام بالأثر:</strong> لا يقرأ إلا بما قُرئ به عن شيوخه</li>
                <li><strong><i class="fas fa-link color-gold"></i> التواتر:</strong> عدم القراءة إلا بما تواتر وصح سنده</li>
                <li><strong><i class="fas fa-balance-scale color-gold"></i> الجمع:</strong> بين الرواية والدراية</li>
                <li><strong><i class="fas fa-certificate color-gold"></i> السند:</strong> الاعتماد على الإسناد الصحيح المتصل</li>
            </ul>
            <div class="quote-box mt-3">
                <i class="fas fa-quote-right"></i>
                "لولا أن ليس لي أن أقرأ إلا بما قُرئ، لقرأت كذا وكذا" - أبو عمرو البصري
            </div>
            <p class="text-center mt-3" style="font-size: 1.2rem; color: var(--secondary-color);">
                <strong>هذا يدل على علمه الواسع بالعربية مع التزامه التام بالأثر المنقول</strong>
            </p>
        `
    },
    
    // Slide 9: Spread
    {
        type: 'content',
        title: 'انتشار قراءته',
        subtitle: 'نبوءة تحققت',
        content: `
            <div class="quote-box mb-3">
                <i class="fas fa-quote-right"></i>
                "تمسك بقراءة أبي عمرو فإنها ستصير للناس إسناداً" - شعبة بن الحجاج
            </div>
            <div class="grid-layout">
                <div class="grid-item">
                    <h3><i class="fas fa-globe color-gold"></i> الانتشار الجغرافي</h3>
                    <p>القراءة المعتمدة في:</p>
                    <ul class="content-list" style="margin-top: 10px;">
                        <li>الشام</li>
                        <li>الحجاز</li>
                        <li>اليمن</li>
                        <li>مصر</li>
                    </ul>
                </div>
                <div class="grid-item">
                    <h3><i class="fas fa-history color-gold"></i> التطور التاريخي</h3>
                    <p>حلت محل قراءة ابن عامر في الشام بعد القرن الخامس الهجري</p>
                </div>
            </div>
            <div class="highlight-box mt-3">
                <h3><i class="fas fa-book-reader"></i> في عصرنا الحاضر</h3>
                <p>القراءة السائدة في التلقين حتى اليوم في كثير من البلدان الإسلامية</p>
            </div>
        `
    },
    
    // Slide 10: The two narrators
    {
        type: 'content',
        title: 'الراويان عن أبي عمرو',
        subtitle: 'بواسطة اليزيدي',
        content: `
            <div class="highlight-box mb-3">
                <h3><i class="fas fa-user-tie color-gold"></i> الراوي الوسيط</h3>
                <p style="font-size: 1.8rem; font-weight: 700;">يحيى بن المبارك اليزيدي</p>
                <p style="font-size: 1.2rem;">(110-202 هـ)</p>
                <p style="margin-top: 15px;">أجل أصحاب أبي عمرو • توفي بخراسان</p>
            </div>
            <div class="grid-layout">
                <div class="grid-item" style="border-right-color: #1a4d7d;">
                    <h3><i class="fas fa-1"></i> الدوري</h3>
                    <p style="font-size: 1.3rem; font-weight: 700;">أبو عمر حفص بن عمر</p>
                    <p style="margin-top: 10px;">الأزدي الدوري</p>
                    <p style="margin-top: 10px; color: var(--accent-gold);">(ت 246 هـ)</p>
                </div>
                <div class="grid-item" style="border-right-color: #2a5f8f;">
                    <h3><i class="fas fa-2"></i> السوسي</h3>
                    <p style="font-size: 1.3rem; font-weight: 700;">أبو شعيب صالح بن زياد</p>
                    <p style="margin-top: 10px;">السوسي</p>
                    <p style="margin-top: 10px; color: var(--accent-gold);">(173-261 هـ)</p>
                </div>
            </div>
        `
    },
    
    // Slide 11: Al-Duri
    {
        type: 'content',
        title: 'الراوي الأول - الدوري',
        subtitle: 'أبو عمر حفص بن عمر',
        content: `
            <ul class="content-list">
                <li><strong><i class="fas fa-id-card"></i> الاسم الكامل:</strong> حفص بن عمر بن عبد العزيز بن صهبان الأزدي</li>
                <li><strong><i class="fas fa-map-pin"></i> النسبة:</strong> الدوري (نسبة إلى "الدور" محلة ببغداد)</li>
                <li><strong><i class="fas fa-award"></i> الصفات:</strong> ضرير، نحوي، ثقة، ضابط، عالم بالحديث</li>
                <li><strong><i class="fas fa-calendar-times"></i> الوفاة:</strong> شوال 246 هـ برنبوية (من قرى الري)</li>
            </ul>
            <div class="highlight-box mt-3">
                <h3><i class="fas fa-trophy color-gold"></i> ميزة خاصة</h3>
                <p style="font-size: 1.4rem;">أول من جمع القراءات السبع في كتاب واحد</p>
            </div>
            <div class="quote-box mt-3">
                <i class="fas fa-quote-right"></i>
                "كان إماماً في القراءات عالماً بالحروف والاختلاف" - ابن الجزري
            </div>
        `
    },
    
    // Slide 12: Al-Soosi
    {
        type: 'content',
        title: 'الراوي الثاني - السوسي',
        subtitle: 'أبو شعيب صالح بن زياد',
        content: `
            <ul class="content-list">
                <li><strong><i class="fas fa-id-card"></i> الاسم الكامل:</strong> صالح بن زياد بن عبد الله بن إسماعيل</li>
                <li><strong><i class="fas fa-map-pin"></i> النسبة:</strong> السوسي (نسبة إلى "السوس" كورة بالأهواز)</li>
                <li><strong><i class="fas fa-award"></i> الصفات:</strong> ضابط، محرر، ثقة، متقن</li>
                <li><strong><i class="fas fa-birthday-cake"></i> الولادة:</strong> سنة 173 هـ</li>
                <li><strong><i class="fas fa-calendar-times"></i> الوفاة:</strong> أول سنة 261 هـ بالرقة</li>
                <li><strong><i class="fas fa-hourglass-half"></i> العمر:</strong> قارب السبعين عاماً</li>
            </ul>
            <div class="quote-box mt-3">
                <i class="fas fa-quote-right"></i>
                "كان إماماً في القراءة ضابطاً متقناً" - ابن الجزري
            </div>
        `
    },
    
    // Slide 13: Principles (Basmala)
    {
        type: 'content',
        title: 'أصول قراءة أبي عمرو (1)',
        subtitle: 'البسملة والاستعاذة',
        content: `
            <div class="grid-layout">
                <div class="grid-item">
                    <h3><i class="fas fa-star-and-crescent color-gold"></i> البسملة بين السورتين</h3>
                    <p style="font-size: 1.3rem; font-weight: 700; margin-top: 10px;">الوصل (عدم البسملة)</p>
                    <p style="margin-top: 15px; padding: 15px; background: rgba(26, 77, 125, 0.1); border-radius: 10px;">
                        <strong>الاستثناء:</strong> بين الأنفال والتوبة:<br>
                        السكت أو الوصل (بدون بسملة)
                    </p>
                </div>
                <div class="grid-item">
                    <h3><i class="fas fa-shield-alt color-gold"></i> الاستعاذة</h3>
                    <p style="margin-top: 10px;">يجوز الإتيان بها قبل القراءة</p>
                    <div class="quote-box" style="margin-top: 15px; font-size: 1.2rem;">
                        "أعوذ بالله من الشيطان الرجيم"
                    </div>
                </div>
            </div>
        `
    },
    
    // Slide 14: Principles (Idgham)
    {
        type: 'content',
        title: 'أصول قراءة أبي عمرو (2)',
        subtitle: 'الإدغام الكبير',
        content: `
            <div class="highlight-box mb-3">
                <h3><i class="fas fa-star color-gold"></i> أبو عمرو هو "قطب" الإدغام الكبير</h3>
                <p style="font-size: 1.3rem;">(أكثر القراء إدغاماً للحروف المتماثلة والمتقاربة)</p>
            </div>
            <table class="content-table">
                <thead>
                    <tr>
                        <th>الآية</th>
                        <th>القراءة بالإدغام</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{قَضَيْتُمْ مَنَاسِكَكُمْ}</td>
                        <td>مَنَاسِكُّمْ (إدغام الكاف في الكاف)</td>
                    </tr>
                    <tr>
                        <td>{مَا سَلَكَكُمْ فِي سَقَرَ}</td>
                        <td>مَا سَلَكُّمْ (إدغام الكاف في الكاف)</td>
                    </tr>
                    <tr>
                        <td>{يَعْلَمُ مَا فِيهِ}</td>
                        <td>إدغام الميم في الميم</td>
                    </tr>
                    <tr>
                        <td>{قَدْ تَبَيَّنَ}</td>
                        <td>قَتَّبَيَّنَ (إدغام الدال في التاء)</td>
                    </tr>
                </tbody>
            </table>
        `
    },
    
    // Slide 15: Principles (Hamza)
    {
        type: 'content',
        title: 'أصول قراءة أبي عمرو (3)',
        subtitle: 'الهمزتان',
        content: `
            <ul class="content-list">
                <li><strong><i class="fas fa-angle-double-right color-gold"></i> الهمزتان المتفقتان:</strong> يُسقط الهمزة الأولى
                    <div class="quote-box" style="margin-top: 10px;">
                        مثال: {جَاءَ أَمْرُنَا} تُقرأ ← {جَا أَمْرُنَا}
                    </div>
                </li>
                <li><strong><i class="fas fa-angle-double-right color-gold"></i> مثال آخر:</strong>
                    <div class="quote-box" style="margin-top: 10px;">
                        {السَّمَاءِ إِنْ} تُقرأ ← {السَّمَاءِ نْ}
                    </div>
                </li>
                <li><strong><i class="fas fa-exclamation-circle color-gold"></i> استثناء مهم:</strong> في كلمة {مُؤْصَدَةٌ}
                    <p style="margin-top: 10px; padding: 15px; background: rgba(212, 175, 55, 0.1); border-radius: 10px;">
                        يحققها (لا يبدلها) للتفريق بين معنيين:<br>
                        <strong>آصد:</strong> أطبق<br>
                        <strong>أوصد:</strong> أغلق
                    </p>
                </li>
            </ul>
        `
    },
    
    // Slide 16: Principles (Ya'at)
    {
        type: 'content',
        title: 'أصول قراءة أبي عمرو (4)',
        subtitle: 'ياءات الإضافة',
        content: `
            <p style="font-size: 1.3rem; margin-bottom: 2rem; text-align: center; color: var(--secondary-color); font-weight: 700;">
                فتح كثير من ياءات الإضافة وإسكان بعضها
            </p>
            <table class="content-table">
                <thead>
                    <tr>
                        <th>الآية</th>
                        <th>الحكم</th>
                        <th>التوضيح</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{إِنِّي أَعْلَمُ}</td>
                        <td>فتح الياء</td>
                        <td>إِنِّيَ أَعْلَمُ</td>
                    </tr>
                    <tr>
                        <td>{نِعْمَتِيَ الَّتِي}</td>
                        <td>إسكان الياء</td>
                        <td>نِعْمَتِيْ الَّتِي</td>
                    </tr>
                    <tr>
                        <td>{مِنِّي إِلَّا مَنِ}</td>
                        <td>فتح الياء</td>
                        <td>مِنِّيَ إِلَّا</td>
                    </tr>
                    <tr>
                        <td>{أَخِي أَشْرِكْهُ}</td>
                        <td>فتح الياء</td>
                        <td>أَخِيَ أَشْرِكْهُ</td>
                    </tr>
                </tbody>
            </table>
        `
    },
    
    // Slide 17: Principles (Meem)
    {
        type: 'content',
        title: 'أصول قراءة أبي عمرو (5)',
        subtitle: 'ميم الجمع',
        content: `
            <div class="grid-layout">
                <div class="grid-item">
                    <h3><i class="fas fa-link color-gold"></i> قبل متحرك</h3>
                    <p style="margin-top: 10px;">صلة الميم بواو لفظية (ضمها)</p>
                    <div class="quote-box" style="margin-top: 15px;">
                        {عَلَيْهُمُ الْقِتَالُ}<br>
                        تُقرأ: عَلَيْهُمُو الْقِتَالُ
                    </div>
                </div>
                <div class="grid-item">
                    <h3><i class="fas fa-pause color-gold"></i> قبل ساكن</h3>
                    <p style="margin-top: 10px;">كسر الميم بشرط:</p>
                    <p style="padding: 10px; background: rgba(26, 77, 125, 0.1); border-radius: 8px; margin-top: 10px;">
                        إذا كانت بعد هاء الضمير المسبوقة بكسر أو ياء ساكنة
                    </p>
                    <div class="quote-box" style="margin-top: 15px;">
                        {عَلَيْهِمِ الذِّلَّةُ}<br>
                        {يُرِيهِمِ اللهُ}
                    </div>
                </div>
            </div>
        `
    },
    
    // Slide 18: Principles (Madd)
    {
        type: 'content',
        title: 'أصول قراءة أبي عمرو (6)',
        subtitle: 'مذهبه في المد',
        content: `
            <table class="content-table">
                <thead>
                    <tr>
                        <th>نوع المد</th>
                        <th>الدوري</th>
                        <th>السوسي</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>المد المنفصل</strong><br>(بين كلمتين)</td>
                        <td>القصر (2) أو التوسط (4)</td>
                        <td>القصر (2) فقط</td>
                    </tr>
                    <tr>
                        <td><strong>المد المتصل</strong><br>(في كلمة واحدة)</td>
                        <td colspan="2">التوسط (4) أو الطول (6)</td>
                    </tr>
                    <tr>
                        <td><strong>المد اللازم</strong><br>(قبل حرف مشدد)</td>
                        <td colspan="2">الإشباع (6 حركات)</td>
                    </tr>
                    <tr>
                        <td><strong>المد الطبيعي</strong></td>
                        <td colspan="2">حركتان (2)</td>
                    </tr>
                </tbody>
            </table>
            <div class="highlight-box mt-3">
                <p><i class="fas fa-info-circle"></i> <strong>ملاحظة:</strong> هذه الأوجه المشهورة في الطيبة والنشر</p>
            </div>
        `
    },
    
    // Slide 19: Examples 1
    {
        type: 'content',
        title: 'فرش الحروف - أمثلة (1)',
        subtitle: 'بعض القراءات المخالفة',
        content: `
            <table class="content-table">
                <thead>
                    <tr>
                        <th style="width: 35%;">الكلمة</th>
                        <th style="width: 32.5%;">قراءة حفص</th>
                        <th style="width: 32.5%;">قراءة أبي عمرو</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{مَالِكِ يَوْمِ الدِّينِ}</td>
                        <td>مَالِكِ (بألف)</td>
                        <td>مَالِكِ أو مَلِكِ</td>
                    </tr>
                    <tr>
                        <td>{يُخَادِعُونَ}</td>
                        <td>يُخَادِعُونَ</td>
                        <td>يَخْدَعُونَ</td>
                    </tr>
                    <tr>
                        <td>{وَيَمْكُرُونَ}</td>
                        <td>وَيَمْكُرُونَ</td>
                        <td>وَيَمْكُرُونَ</td>
                    </tr>
                    <tr>
                        <td>{تَعْلَمُونَ} (البقرة 22)</td>
                        <td>تَعْلَمُونَ</td>
                        <td>تَعْلَمُونَ</td>
                    </tr>
                </tbody>
            </table>
        `
    },
    
    // Slide 20: Examples 2
    {
        type: 'content',
        title: 'فرش الحروف - أمثلة (2)',
        subtitle: 'اختلافات في الإعراب والصيغة',
        content: `
            <table class="content-table">
                <thead>
                    <tr>
                        <th style="width: 35%;">الكلمة</th>
                        <th style="width: 32.5%;">قراءة حفص</th>
                        <th style="width: 32.5%;">قراءة أبي عمرو</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{قُلِ الْعَفْوَ}<br>(البقرة 219)</td>
                        <td>العَفْوَ (نصب)</td>
                        <td>العَفْوُ (رفع)</td>
                    </tr>
                    <tr>
                        <td>{أَهْلَكْنَا}<br>(الحج 45)</td>
                        <td>أَهْلَكْنَا (بنون)</td>
                        <td>أَهْلَكْنَاهَا (بنون وهاء)</td>
                    </tr>
                    <tr>
                        <td>{مُعَاجِزِينَ}<br>(سبأ 38)</td>
                        <td>مُعَاجِزِينَ (بألف)</td>
                        <td>مُعْجِزِينَ (بتشديد وبلا ألف)</td>
                    </tr>
                    <tr>
                        <td>{نُنْشِزُهَا}<br>(البقرة 259)</td>
                        <td>نُنْشِزُهَا (بالزاي)</td>
                        <td>نُنْشِرُهَا (بالراء)</td>
                    </tr>
                </tbody>
            </table>
        `
    },
    
    // Slide 21: Examples 3
    {
        type: 'content',
        title: 'فرش الحروف - أمثلة (3)',
        subtitle: 'في سورة ص والحديد',
        content: `
            <table class="content-table">
                <thead>
                    <tr>
                        <th>الكلمة</th>
                        <th>قراءة حفص</th>
                        <th>قراءة أبي عمرو</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{وَآخَرُ مِنْ شَكْلِهِ}<br>(ص 58)</td>
                        <td>وَآخَرُ (بألف)</td>
                        <td>وَأُخَرُ (بضم بلا ألف)</td>
                    </tr>
                    <tr>
                        <td>{هَذَا مَا تُوعَدُونَ}<br>(ص 49)</td>
                        <td>تُوعَدُونَ (بتاء)</td>
                        <td>يُوعَدُونَ (بياء)</td>
                    </tr>
                    <tr>
                        <td>{وَقَدْ أَخَذَ مِيثَاقَكُمْ}<br>(الحديد 8)</td>
                        <td>أَخَذَ (معلوم)</td>
                        <td>أُخِذَ (مجهول)</td>
                    </tr>
                </tbody>
            </table>
            <div class="highlight-box mt-3">
                <p><i class="fas fa-book-open"></i> <strong>فائدة:</strong> كل قراءة تضيف معنى جديداً وبُعداً إضافياً للآية</p>
            </div>
        `
    },
    
    // Slide 22: Differences between narrators
    {
        type: 'content',
        title: 'الاختلاف بين الدوري والسوسي',
        subtitle: 'أوجه الاختلاف الرئيسية',
        content: `
            <div class="grid-layout">
                <div class="grid-item">
                    <h3><i class="fas fa-text-width color-gold"></i> المد المنفصل</h3>
                    <p><strong>الدوري:</strong> القصر (2) أو التوسط (4)</p>
                    <p><strong>السوسي:</strong> القصر (2) فقط</p>
                </div>
                <div class="grid-item">
                    <h3><i class="fas fa-pause-circle color-gold"></i> السكت</h3>
                    <p><strong>السوسي:</strong> له سكتات خاصة في بعض المواضع</p>
                    <p><strong>الدوري:</strong> لا سكت له</p>
                </div>
                <div class="grid-item">
                    <h3><i class="fas fa-link color-gold"></i> الصلة</h3>
                    <p>بعض الاختلافات في صلة هاء الضمير بين الراويين</p>
                </div>
                <div class="grid-item">
                    <h3><i class="fas fa-spell-check color-gold"></i> بعض الكلمات</h3>
                    <p>اختلافات يسيرة في بعض الكلمات المفردة في الفرش</p>
                </div>
            </div>
        `
    },
    
    // Slide 23: Books
    {
        type: 'content',
        title: 'كتب متخصصة في قراءة أبي عمرو',
        subtitle: 'مراجع مهمة للدارسين',
        content: `
            <ul class="content-list">
                <li><strong><i class="fas fa-book color-gold"></i> الكوكب الدري في قراءة أبي عمرو البصري</strong><br>
                    محمد المتولي (منظومة شعرية)</li>
                <li><strong><i class="fas fa-book color-gold"></i> إتحاف الأنام في أصول وفرش قراءة أبي عمرو</strong><br>
                    (شرح على الكوكب الدري)</li>
                <li><strong><i class="fas fa-book color-gold"></i> أصول رواية الدوري عن أبي عمرو</strong><br>
                    دراسات متخصصة</li>
                <li><strong><i class="fas fa-book color-gold"></i> أصول رواية السوسي عن أبي عمرو</strong><br>
                    دراسات متخصصة</li>
                <li><strong><i class="fas fa-book color-gold"></i> كتب القراءات العامة</strong><br>
                    الشاطبية، النشر، الطيبة، إتحاف فضلاء البشر</li>
            </ul>
        `
    },
    
    // Slide 24: Importance
    {
        type: 'content',
        title: 'أهمية دراسة قراءة أبي عمرو',
        subtitle: 'لماذا ندرسها؟',
        content: `
            <ul class="content-list">
                <li><strong><i class="fas fa-check-circle color-gold"></i> قراءة متواترة</strong> صحيحة السند عن النبي ﷺ</li>
                <li><strong><i class="fas fa-check-circle color-gold"></i> من القراءات السبع المشهورة</strong> المتلقاة بالقبول</li>
                <li><strong><i class="fas fa-check-circle color-gold"></i> واسعة الانتشار</strong> في كثير من بلاد المسلمين</li>
                <li><strong><i class="fas fa-check-circle color-gold"></i> تفتح آفاق الفهم</strong> لمعاني القرآن الكريم</li>
                <li><strong><i class="fas fa-check-circle color-gold"></i> تُظهر ثراء اللغة العربية</strong> وإعجاز القرآن</li>
                <li><strong><i class="fas fa-check-circle color-gold"></i> حفظ التراث الإسلامي</strong> ونقله للأجيال القادمة</li>
            </ul>
            <div class="quote-box mt-3">
                <i class="fas fa-quote-right"></i>
                من حفظ القراءات حفظ اللغة العربية ووثّق المعاني القرآنية
            </div>
        `
    },
    
    // Slide 25: Benefits of multiple readings
    {
        type: 'content',
        title: 'فوائد تعدد القراءات',
        subtitle: 'حكم بالغة',
        content: `
            <ul class="content-list">
                <li><strong><i class="fas fa-hands-helping color-gold"></i> التيسير على الأمة:</strong> القراءات نزلت على سبعة أحرف تيسيراً على الأمة</li>
                <li><strong><i class="fas fa-gem color-gold"></i> ثراء المعاني:</strong> كل قراءة تضيف بُعداً جديداً للمعنى</li>
                <li><strong><i class="fas fa-star color-gold"></i> الإعجاز اللغوي:</strong> تظهر فصاحة القرآن من جوانب متعددة</li>
                <li><strong><i class="fas fa-shield-alt color-gold"></i> التواتر والثبوت:</strong> تعدد الطرق يقوي اليقين بثبوت القرآن</li>
                <li><strong><i class="fas fa-language color-gold"></i> حفظ اللغة العربية:</strong> القراءات وثّقت لهجات العرب الفصحى</li>
            </ul>
            <div class="highlight-box mt-3">
                <h3><i class="fas fa-lightbulb color-gold"></i> قاعدة ذهبية</h3>
                <p style="font-size: 1.4rem;">"تعدد القراءات بمنزلة تعدد الآيات"</p>
            </div>
        `
    },
    
    // Slide 26: Method of receiving
    {
        type: 'content',
        title: 'منهج التلقي والإقراء',
        subtitle: 'أركان القراءة الصحيحة',
        content: `
            <div class="highlight-box mb-3">
                <h3><i class="fas fa-star color-gold"></i> شروط قبول القراءة (ثلاثة)</h3>
            </div>
            <div class="grid-layout">
                <div class="grid-item">
                    <h3><i class="fas fa-1"></i> صحة السند</h3>
                    <p>(التواتر)</p>
                    <p style="margin-top: 10px;">أن تنقل بسند متصل متواتر إلى النبي ﷺ</p>
                </div>
                <div class="grid-item">
                    <h3><i class="fas fa-2"></i> موافقة العربية</h3>
                    <p>(ولو ضعيفاً)</p>
                    <p style="margin-top: 10px;">أن توافق وجهاً من وجوه النحو العربي</p>
                </div>
                <div class="grid-item">
                    <h3><i class="fas fa-3"></i> موافقة الرسم</h3>
                    <p>(ولو احتمالاً)</p>
                    <p style="margin-top: 10px;">أن توافق رسم المصحف العثماني</p>
                </div>
            </div>
            <div class="quote-box mt-3">
                <i class="fas fa-quote-right"></i>
                <strong>طريقة التلقي:</strong> المشافهة والعرض على الشيوخ المتقنين بالسند المتصل
            </div>
        `
    },
    
    // Slide 27: Example of guidance 1
    {
        type: 'content',
        title: 'نماذج من توجيه القراءات',
        subtitle: 'مثال: {قُلِ الْعَفْوَ}',
        content: `
            <div class="grid-layout">
                <div class="grid-item" style="background: linear-gradient(135deg, rgba(26, 77, 125, 0.1), rgba(42, 95, 143, 0.1));">
                    <h3><i class="fas fa-book-open color-gold"></i> قراءة الجمهور (النصب)</h3>
                    <div class="quote-box">
                        قُلِ الْعَفْوَ (بالنصب)
                    </div>
                    <p style="margin-top: 15px;"><strong>التوجيه النحوي:</strong></p>
                    <p>مفعول به لفعل محذوف تقديره: "أنفقوا العفوَ"</p>
                    <p style="margin-top: 10px;"><strong>المعنى:</strong> أمر صريح بالإنفاق</p>
                </div>
                <div class="grid-item" style="background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(244, 208, 63, 0.1));">
                    <h3><i class="fas fa-book color-gold"></i> قراءة أبي عمرو (الرفع)</h3>
                    <div class="quote-box">
                        قُلِ الْعَفْوُ (بالرفع)
                    </div>
                    <p style="margin-top: 15px;"><strong>التوجيه النحوي:</strong></p>
                    <p>مبتدأ محذوف الخبر تقديره: "المنفَق هو العفوُ"</p>
                    <p style="margin-top: 10px;"><strong>المعنى:</strong> حصر وتعيين للمنفق</p>
                </div>
            </div>
            <div class="highlight-box mt-3">
                <h3><i class="fas fa-lightbulb color-gold"></i> الفائدة</h3>
                <p>كلتا القراءتين تدل على وجوب إنفاق الفضل عن الحاجة، لكن بأسلوبين بلاغيين مختلفين</p>
            </div>
        `
    },
    
    // Slide 28: Example of guidance 2
    {
        type: 'content',
        title: 'نماذج من توجيه القراءات',
        subtitle: 'مثال: {مَالِكِ / مَلِكِ}',
        content: `
            <div class="grid-layout">
                <div class="grid-item" style="background: linear-gradient(135deg, rgba(39, 174, 96, 0.1), rgba(46, 204, 113, 0.1));">
                    <h3><i class="fas fa-crown color-gold"></i> مَالِكِ (بالألف)</h3>
                    <p style="font-size: 1.3rem; font-weight: 700; margin: 15px 0;">يدل على ملك الأعيان</p>
                    <ul class="content-list" style="margin: 0;">
                        <li>التصرف في المملوكات</li>
                        <li>التحكم في الأموال والأشياء</li>
                        <li>السلطة المادية</li>
                    </ul>
                </div>
                <div class="grid-item" style="background: linear-gradient(135deg, rgba(142, 68, 173, 0.1), rgba(155, 89, 182, 0.1));">
                    <h3><i class="fas fa-chess-king color-gold"></i> مَلِكِ (بلا ألف)</h3>
                    <p style="font-size: 1.3rem; font-weight: 700; margin: 15px 0;">يدل على السلطان والقهر</p>
                    <ul class="content-list" style="margin: 0;">
                        <li>الحكم والتدبير</li>
                        <li>القدرة المطلقة</li>
                        <li>السلطة المعنوية</li>
                    </ul>
                </div>
            </div>
            <div class="highlight-box mt-3">
                <h3><i class="fas fa-star color-gold"></i> الفائدة</h3>
                <p style="font-size: 1.3rem;">الجمع بين المعنيين يفيد الكمال المطلق لله تعالى في ملكه وحكمه</p>
            </div>
        `
    },
    
    // Slide 29: Status among reciters
    {
        type: 'content',
        title: 'مكانة أبي عمرو بين القراء',
        subtitle: 'خصائص تميز بها',
        content: `
            <ul class="content-list">
                <li><strong><i class="fas fa-star color-gold"></i></strong> أكثر القراء السبعة شيوخاً (أخذ عن أكثر من 60 شيخاً)</li>
                <li><strong><i class="fas fa-medal color-gold"></i></strong> الوحيد من القراء السبعة الذي أدرك الصحابة وسمع منهم</li>
                <li><strong><i class="fas fa-graduation-cap color-gold"></i></strong> إمام في ثلاثة علوم: القراءة والنحو واللغة</li>
                <li><strong><i class="fas fa-compress-alt color-gold"></i></strong> صاحب الإدغام الكبير (أكثر القراء إدغاماً)</li>
                <li><strong><i class="fas fa-globe color-gold"></i></strong> قراءته الأوسع انتشاراً تاريخياً في العالم الإسلامي</li>
            </ul>
            <div class="quote-box mt-3">
                <i class="fas fa-quote-right"></i>
                "لو قُسم علم أبي عمرو وزهده على مائة إنسان لكانوا كلهم علماء زهاداً" - يونس بن حبيب
            </div>
        `
    },
    
    // Slide 30: Present day
    {
        type: 'content',
        title: 'القراءة في عصرنا الحاضر',
        subtitle: 'واقع قراءة أبي عمرو اليوم',
        content: `
            <div class="grid-layout">
                <div class="grid-item">
                    <h3><i class="fas fa-map color-gold"></i> الانتشار الجغرافي</h3>
                    <p><strong>منتشرة في:</strong></p>
                    <ul class="content-list" style="margin-top: 10px;">
                        <li>ليبيا</li>
                        <li>تونس</li>
                        <li>الجزائر</li>
                        <li>السودان</li>
                        <li>موريتانيا</li>
                        <li>بعض مناطق مصر</li>
                    </ul>
                </div>
                <div class="grid-item">
                    <h3><i class="fas fa-users color-gold"></i> الواقع العملي</h3>
                    <ul class="content-list" style="margin: 0;">
                        <li><strong>رواية السوسي:</strong> الأكثر انتشاراً في المغرب العربي</li>
                        <li>مصاحف مطبوعة برواية الدوري والسوسي</li>
                        <li>معاهد متخصصة في تعليم القراءات</li>
                        <li>شيوخ مسندون في كل بلد</li>
                    </ul>
                </div>
            </div>
        `
    },
    
    // Slide 31: How to learn
    {
        type: 'content',
        title: 'كيف نتعلم قراءة أبي عمرو؟',
        subtitle: 'خطوات عملية',
        content: `
            <div class="grid-layout">
                <div class="grid-item">
                    <h3><i class="fas fa-1"></i> إتقان قراءة حفص أولاً</h3>
                    <p>(الأساس الذي نبني عليه)</p>
                </div>
                <div class="grid-item">
                    <h3><i class="fas fa-2"></i> دراسة الأصول</h3>
                    <p>(الإدغام، الهمز، المدود...)</p>
                </div>
                <div class="grid-item">
                    <h3><i class="fas fa-3"></i> حفظ الفرش</h3>
                    <p>(الكلمات المخالفة)</p>
                </div>
                <div class="grid-item">
                    <h3><i class="fas fa-4"></i> العرض على شيخ متقن</h3>
                    <p>(بالسند المتصل)</p>
                </div>
                <div class="grid-item">
                    <h3><i class="fas fa-5"></i> الختمات المتكررة</h3>
                    <p>(لتثبيت القراءة)</p>
                </div>
                <div class="grid-item">
                    <h3><i class="fas fa-6"></i> الحصول على الإجازة</h3>
                    <p>(بالسند المتصل إلى النبي ﷺ)</p>
                </div>
            </div>
        `
    },
    
    // Slide 32: Summary
    {
        type: 'content',
        title: 'الخلاصة والنتائج',
        subtitle: 'خلاصة البحث',
        content: `
            <ul class="content-list">
                <li><strong><i class="fas fa-check-circle color-gold"></i></strong> أبو عمرو البصري: إمام عظيم في القراءة والعلوم الإسلامية</li>
                <li><strong><i class="fas fa-check-circle color-gold"></i></strong> قراءته: متواترة صحيحة مقبولة عند الأمة جمعاء</li>
                <li><strong><i class="fas fa-check-circle color-gold"></i></strong> رواته: الدوري والسوسي (عن اليزيدي)</li>
                <li><strong><i class="fas fa-check-circle color-gold"></i></strong> أصول قراءته: محكمة مضبوطة بالنقل المتواتر</li>
                <li><strong><i class="fas fa-check-circle color-gold"></i></strong> انتشارها: واسع تاريخياً وفي عصرنا الحاضر</li>
                <li><strong><i class="fas fa-check-circle color-gold"></i></strong> فائدتها: ثراء المعاني وإظهار الإعجاز القرآني</li>
            </ul>
            <div class="highlight-box mt-3">
                <h3><i class="fas fa-hand-point-left color-gold"></i> توصية</h3>
                <p style="font-size: 1.3rem;">على طلاب العلم الاهتمام بالقراءات وتعلمها والسعي للحصول على الإجازات المسندة</p>
            </div>
        `
    },
    
    // Slide 33: References
    {
        type: 'content',
        title: 'المصادر والمراجع',
        subtitle: 'من أهم المصادر',
        content: `
            <ul class="content-list">
                <li><strong><i class="fas fa-book color-gold"></i> غاية النهاية في طبقات القراء</strong> - ابن الجزري</li>
                <li><strong><i class="fas fa-book color-gold"></i> معرفة القراء الكبار</strong> - الذهبي</li>
                <li><strong><i class="fas fa-book color-gold"></i> النشر في القراءات العشر</strong> - ابن الجزري</li>
                <li><strong><i class="fas fa-book color-gold"></i> الشاطبية (حرز الأماني)</strong> - القاسم الشاطبي</li>
                <li><strong><i class="fas fa-book color-gold"></i> طيبة النشر</strong> - ابن الجزري</li>
                <li><strong><i class="fas fa-book color-gold"></i> إتحاف فضلاء البشر</strong> - الدمياطي</li>
                <li><strong><i class="fas fa-book color-gold"></i> الكوكب الدري في قراءة أبي عمرو البصري</strong> - المتولي</li>
            </ul>
        `
    }
   ];

// ==========================================
// PARTICLE CONFIGURATION
// ==========================================

const particlesConfig = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#d4af37"
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000"
            }
        },
        opacity: {
            value: 0.5,
            random: false,
            anim: {
                enable: false,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: false,
                speed: 40,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#d4af37",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: {
                enable: false,
                rotateX: 600,
                rotateY: 1200
            }
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "repulse"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 400,
                line_linked: {
                    opacity: 1
                }
            },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3
            },
            repulse: {
                distance: 200,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            },
            remove: {
                particles_nb: 2
            }
        }
    },
    retina_detect: true
};

// ==========================================
// INITIALIZATION
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    initLoading();
    initCursor();
    initSlides();
    initEventListeners();
    initKeyboardShortcuts();
    initTouchGestures();
});

// ==========================================
// PARTICLES INITIALIZATION
// ==========================================

function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', particlesConfig);
    }
}

// ==========================================
// LOADING SCREEN
// ==========================================

function initLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingProgressBar = document.getElementById('loadingProgress');
    const welcomeScreen = document.getElementById('welcomeScreen');
    
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                welcomeScreen.classList.add('active');
            }, 500);
        }
        
        loadingProgressBar.style.width = progress + '%';
    }, 200);
}

// ==========================================
// CUSTOM CURSOR
// ==========================================

function initCursor() {
    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');
    
    if (!cursorDot || !cursorOutline) return;
    
    // Check if device supports mouse
    if (window.matchMedia("(pointer: coarse)").matches) {
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
        return;
    }
    
    document.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        
        cursorDot.style.left = posX + 'px';
        cursorDot.style.top = posY + 'px';
        
        cursorOutline.style.left = posX + 'px';
        cursorOutline.style.top = posY + 'px';
    });
    
    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('button, a, .nav-control, .thumbnail-item, .menu-section');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = 'scale(2)';
            cursorOutline.style.transform = 'scale(1.5)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = 'scale(1)';
            cursorOutline.style.transform = 'scale(1)';
        });
    });
}

// ==========================================
// SLIDES INITIALIZATION
// ==========================================

function initSlides() {
    const slidesWrapper = document.getElementById('slidesWrapper');
    const totalSlidesElement = document.getElementById('totalSlides');
    
    // Generate slides
    slidesData.forEach((slideData, index) => {
        const slide = createSlide(slideData, index);
        slidesWrapper.appendChild(slide);
    });
    
    // Set total slides count
    totalSlidesElement.textContent = slidesData.length;
    
    // Show first slide
    showSlide(0);
    
    // Generate thumbnails
    generateThumbnails();
}

// ==========================================
// CREATE SLIDE ELEMENT
// ==========================================

function createSlide(slideData, index) {
    const slide = document.createElement('div');
    slide.className = 'slide';
    slide.setAttribute('data-slide-index', index);
    
    if (slideData.type === 'title') {
        slide.classList.add('title-slide');
    }
    
    const slideContent = document.createElement('div');
    slideContent.className = 'slide-content';
    
    let contentHTML = '';
    
    if (slideData.title) {
        contentHTML += `<h1 class="slide-title">${slideData.title}</h1>`;
    }
    
    if (slideData.subtitle) {
        contentHTML += `<h2 class="slide-subtitle">${slideData.subtitle}</h2>`;
    }
    
    if (slideData.content) {
        contentHTML += slideData.content;
    }
    
    slideContent.innerHTML = contentHTML;
    slide.appendChild(slideContent);
    
    return slide;
}

// ==========================================
// SHOW SLIDE
// ==========================================

function showSlide(index, direction = 'next') {
    if (isTransitioning) return;
    
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    // Validate index
    if (index < 0 || index >= totalSlides) return;
    
    isTransitioning = true;
    
    // Get current and next slides
    const currentSlide = slides[currentSlideIndex];
    const nextSlide = slides[index];
    
    // Add exit animation to current slide
    if (currentSlide) {
        if (direction === 'next') {
            currentSlide.classList.add('prev-out');
        } else {
            currentSlide.classList.add('next-out');
        }
        
        setTimeout(() => {
            currentSlide.classList.remove('active', 'prev-out', 'next-out');
        }, 600);
    }
    
    // Show next slide
    nextSlide.classList.add('active');
    
    // Update current index
    currentSlideIndex = index;
    
    // Update UI
    updateSlideCounter();
    updateProgressBar();
    updateNavigationButtons();
    updateThumbnails();
    
    // Reset transition flag
    setTimeout(() => {
        isTransitioning = false;
    }, 800);
}

// ==========================================
// NAVIGATION FUNCTIONS
// ==========================================

function nextSlide() {
    const totalSlides = document.querySelectorAll('.slide').length;
    if (currentSlideIndex < totalSlides - 1) {
        showSlide(currentSlideIndex + 1, 'next');
    }
}

function prevSlide() {
    if (currentSlideIndex > 0) {
        showSlide(currentSlideIndex - 1, 'prev');
    }
}

function goToSlide(index) {
    const direction = index > currentSlideIndex ? 'next' : 'prev';
    showSlide(index, direction);
}

function goToFirstSlide() {
    showSlide(0, 'prev');
}

function goToLastSlide() {
    const totalSlides = document.querySelectorAll('.slide').length;
    showSlide(totalSlides - 1, 'next');
}

// ==========================================
// UPDATE UI ELEMENTS
// ==========================================

function updateSlideCounter() {
    const currentSlideElement = document.getElementById('currentSlide');
    currentSlideElement.textContent = currentSlideIndex + 1;
}

function updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const totalSlides = document.querySelectorAll('.slide').length;
    const progress = ((currentSlideIndex + 1) / totalSlides) * 100;
    progressBar.style.width = progress + '%';
}

function updateNavigationButtons() {
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const totalSlides = document.querySelectorAll('.slide').length;
    
    // Disable/enable prev button
    if (currentSlideIndex === 0) {
        prevButton.disabled = true;
        prevButton.style.opacity = '0.5';
    } else {
        prevButton.disabled = false;
        prevButton.style.opacity = '1';
    }
    
    // Disable/enable next button
    if (currentSlideIndex === totalSlides - 1) {
        nextButton.disabled = true;
        nextButton.style.opacity = '0.5';
    } else {
        nextButton.disabled = false;
        nextButton.style.opacity = '1';
    }
}

function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail-item');
    thumbnails.forEach((thumb, index) => {
        if (index === currentSlideIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

// ==========================================
// GENERATE THUMBNAILS
// ==========================================

function generateThumbnails() {
    const thumbnailsContainer = document.getElementById('thumbnailsContainer');
    
    slidesData.forEach((slideData, index) => {
        const thumbnailItem = document.createElement('div');
        thumbnailItem.className = 'thumbnail-item';
        thumbnailItem.setAttribute('data-slide-index', index);
        
        const thumbnailNumber = document.createElement('div');
        thumbnailNumber.className = 'thumbnail-number';
        thumbnailNumber.textContent = `شريحة ${index + 1}`;
        
        const thumbnailTitle = document.createElement('div');
        thumbnailTitle.className = 'thumbnail-title';
        thumbnailTitle.textContent = slideData.title || 'بدون عنوان';
        
        thumbnailItem.appendChild(thumbnailNumber);
        thumbnailItem.appendChild(thumbnailTitle);
        
        thumbnailItem.addEventListener('click', () => {
            goToSlide(index);
            closeThumbnailsSidebar();
        });
        
        thumbnailsContainer.appendChild(thumbnailItem);
    });
    
    updateThumbnails();
}

// ==========================================
// EVENT LISTENERS
// ==========================================

function initEventListeners() {
    // Start button
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', startPresentation);
    }
    
    // Navigation buttons
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    
    if (prevButton) {
        prevButton.addEventListener('click', prevSlide);
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', nextSlide);
    }
    
    // Menu button
    const menuButton = document.getElementById('menuButton');
    if (menuButton) {
        menuButton.addEventListener('click', toggleMenu);
    }
    
    // Close menu
    const closeMenu = document.getElementById('closeMenu');
    if (closeMenu) {
        closeMenu.addEventListener('click', toggleMenu);
    }
    
    // Menu overlay click
    const menuOverlay = document.getElementById('menuOverlay');
    if (menuOverlay) {
        menuOverlay.addEventListener('click', (e) => {
            if (e.target === menuOverlay) {
                toggleMenu();
            }
        });
    }
    
    // Menu sections
    const menuSections = document.querySelectorAll('.menu-section');
    menuSections.forEach(section => {
        section.addEventListener('click', function() {
            const sectionType = this.getAttribute('data-section');
            navigateToSection(sectionType);
            toggleMenu();
        });
    });
    
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Fullscreen button
    const fullscreenButton = document.getElementById('fullscreenButton');
    if (fullscreenButton) {
        fullscreenButton.addEventListener('click', toggleFullscreen);
    }
    
    // Thumbnails sidebar
    const closeSidebar = document.getElementById('closeSidebar');
    if (closeSidebar) {
        closeSidebar.addEventListener('click', closeThumbnailsSidebar);
    }
    
    // Fullscreen change event
    document.addEventListener('fullscreenchange', updateFullscreenButton);
    document.addEventListener('webkitfullscreenchange', updateFullscreenButton);
    document.addEventListener('mozfullscreenchange', updateFullscreenButton);
    document.addEventListener('MSFullscreenChange', updateFullscreenButton);
}

// ==========================================
// START PRESENTATION
// ==========================================

function startPresentation() {
    const welcomeScreen = document.getElementById('welcomeScreen');
    const presentationContainer = document.getElementById('presentationContainer');
    
    welcomeScreen.classList.add('hidden');
    welcomeScreen.classList.remove('active');
    
    setTimeout(() => {
        presentationContainer.classList.add('active');
    }, 500);
}

// ==========================================
// MENU FUNCTIONS
// ==========================================

function toggleMenu() {
    const menuOverlay = document.getElementById('menuOverlay');
    menuOverlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
}

function navigateToSection(sectionType) {
    const sectionMap = {
        'intro': 0,
        'biography': 3,
        'methodology': 7,
        'narrators': 15,
        'principles': 22,
        'conclusion': 30
    };
    
    const slideIndex = sectionMap[sectionType] || 0;
    goToSlide(slideIndex);
}

// ==========================================
// THUMBNAILS SIDEBAR
// ==========================================

function toggleThumbnailsSidebar() {
    const sidebar = document.getElementById('thumbnailsSidebar');
    sidebar.classList.toggle('active');
}

function closeThumbnailsSidebar() {
    const sidebar = document.getElementById('thumbnailsSidebar');
    sidebar.classList.remove('active');
}

// ==========================================
// THEME TOGGLE
// ==========================================

function toggleTheme() {
    isDarkMode = !isDarkMode;
    const themeIcon = document.querySelector('#themeToggle i');
    
    if (isDarkMode) {
        document.body.style.filter = 'none';
        themeIcon.className = 'fas fa-moon';
    } else {
        document.body.style.filter = 'brightness(1.2) contrast(0.9)';
        themeIcon.className = 'fas fa-sun';
    }
}

// ==========================================
// FULLSCREEN
// ==========================================

function toggleFullscreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement && 
        !document.mozFullScreenElement && !document.msFullscreenElement) {
        enterFullscreen();
    } else {
        exitFullscreen();
    }
}

function enterFullscreen() {
    const elem = document.documentElement;
    
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

function updateFullscreenButton() {
    const fullscreenIcon = document.querySelector('#fullscreenButton i');
    
    if (document.fullscreenElement || document.webkitFullscreenElement || 
        document.mozFullScreenElement || document.msFullscreenElement) {
        fullscreenIcon.className = 'fas fa-compress';
    } else {
        fullscreenIcon.className = 'fas fa-expand';
    }
}

// ==========================================
// KEYBOARD SHORTCUTS
// ==========================================

function initKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Prevent default for navigation keys
        if (['ArrowLeft', 'ArrowRight', 'Home', 'End', 'Space'].includes(e.key)) {
            e.preventDefault();
        }
        
        switch(e.key) {
            case 'ArrowLeft':
                nextSlide(); // RTL: Left arrow goes to next
                break;
            case 'ArrowRight':
                prevSlide(); // RTL: Right arrow goes to previous
                break;
            case 'Home':
                goToFirstSlide();
                break;
            case 'End':
                goToLastSlide();
                break;
            case ' ':
            case 'Space':
                nextSlide();
                break;
            case 'f':
            case 'F':
                toggleFullscreen();
                break;
            case 'm':
            case 'M':
                toggleMenu();
                break;
            case 't':
            case 'T':
                toggleThumbnailsSidebar();
                break;
            case 'Escape':
                if (document.fullscreenElement) {
                    exitFullscreen();
                }
                const menuOverlay = document.getElementById('menuOverlay');
                if (menuOverlay.classList.contains('active')) {
                    toggleMenu();
                }
                closeThumbnailsSidebar();
                break;
            case '?':
                toggleKeyboardHelp();
                break;
        }
    });
}

function toggleKeyboardHelp() {
    const keyboardHelp = document.getElementById('keyboardHelp');
    keyboardHelp.classList.toggle('visible');
}

// ==========================================
// TOUCH GESTURES
// ==========================================

function initTouchGestures() {
    const slidesWrapper = document.getElementById('slidesWrapper');
    
    slidesWrapper.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    slidesWrapper.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - go to previous (RTL)
            prevSlide();
        } else {
            // Swiped right - go to next (RTL)
            nextSlide();
        }
    }
}

// ==========================================
// AUTO PLAY
// ==========================================

function startAutoPlay(intervalSeconds = 5) {
    stopAutoPlay();
    autoPlayInterval = setInterval(() => {
        const totalSlides = document.querySelectorAll('.slide').length;
        if (currentSlideIndex < totalSlides - 1) {
            nextSlide();
        } else {
            stopAutoPlay();
        }
    }, intervalSeconds * 1000);
}

function stopAutoPlay() {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==========================================
// PRINT FUNCTION
// ==========================================

function printPresentation() {
    window.print();
}

// ==========================================
// EXPORT TO PDF (requires html2pdf library)
// ==========================================

function exportToPDF() {
    alert('لتصدير العرض إلى PDF، يمكنك استخدام خيار الطباعة (Ctrl+P) واختيار "حفظ كـ PDF"');
}

// ==========================================
// SHARE FUNCTIONALITY
// ==========================================

function sharePresentation() {
    if (navigator.share) {
        navigator.share({
            title: 'أبو عمرو البصري ورواته',
            text: 'عرض تقديمي احترافي عن أبي عمرو البصري وأصول قراءته',
            url: window.location.href
        }).catch((error) => console.log('Error sharing:', error));
    } else {
        // Fallback for browsers that don't support Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            alert('تم نسخ الرابط إلى الحافظة!');
        });
    }
}

// ==========================================
// RESPONSIVE BEHAVIOR
// ==========================================

window.addEventListener('resize', debounce(() => {
    // Update layout on resize
    updateProgressBar();
}, 250));

// ==========================================
// PAGE VISIBILITY
// ==========================================

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        stopAutoPlay();
    }
});

// ==========================================
// CONSOLE INFO
// ==========================================

console.log('%c أبو عمرو البصري ورواته ', 'background: #1a4d7d; color: #d4af37; font-size: 20px; padding: 10px;');
console.log('%c عرض تقديمي احترافي ', 'background: #d4af37; color: #0a0e27; font-size: 16px; padding: 5px;');
console.log('%c اختصارات لوحة المفاتيح: ', 'font-size: 14px; font-weight: bold;');
console.log('→ السابق | ← التالي | Home أول شريحة | End آخر شريحة');
console.log('F ملء الشاشة | M القائمة | T الشرائح | Esc خروج');

// ==========================================
// INITIALIZATION COMPLETE
// ==========================================

console.log('%c ✓ تم تحميل العرض التقديمي بنجاح ', 'background: #27ae60; color: white; padding: 5px; border-radius: 3px;');
