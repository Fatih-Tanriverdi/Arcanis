import React from 'react';
import "./About.css";

export default function About() {
    return (
        <div className='about-page-container'>
            <img className='logo-about' src="../images/space-background.jpeg" />
            <div className='about-comment'>
                <h1>Hakkımızda</h1>
                <p>Hoş geldiniz! Biz, Arcanis Projesi ekibi olarak seyahat deneyimlerinizi daha kolay, keyifli ve sorunsuz hale getirmek amacıyla yola çıktık. Arcanis, bilet satışı ve yönetimi konusunda size birinci sınıf bir çözüm sunmak için özel olarak tasarlanmış bir projedir.
                </p>
            </div>
            <div className='about-comment'>
                <h1>Vizyonumuz</h1>
                <p>Seyahat etmek artık karmaşık olmamalıdır. Vizyonumuz, kullanıcı dostu bir platform üzerinden seyahat edenlere en iyi hizmeti sunmak ve her adımda mükemmel bir deneyim sağlamaktır. Arcanis Projesi, modern teknoloji ve kullanıcı odaklı tasarımı bir araya getirerek, seyahat etmeyi daha erişilebilir ve keyifli hale getirmeyi amaçlamaktadır.
                </p>
            </div>
            <div className='about-comment'>
                <h1>Hizmetlerimiz</h1>
                <p>Arcanis Projesi, araç, bilet, sefer ve kullanıcı yönetimi gibi önemli veri işlemlerini tek bir platformda birleştirir. Yönetim panelimiz sayesinde, seyahat operasyonlarınızı daha etkin bir şekilde yönetebilir ve istatistiklerle performansınızı takip edebilirsiniz. Aynı zamanda, müşteri sayfamızda kolayca bilet satın alabilir, satın alınan biletleri görüntüleyebilir ve seyahat planlarınızı düzenleyebilirsiniz.
                </p>
            </div>
            <div className='about-comment'>
                <h1>Müşteri Memnuniyeti</h1>
                <p>Bizim için müşteri memnuniyeti her şeyden önce gelir. Sizlere en iyi hizmeti sunmak için sürekli olarak gelişiyor ve feedbacklerinizi dikkate alıyoruz. Arcanis Projesi, sizlere daha iyi bir seyahat deneyimi sunmak için sürekli olarak yenilenen bir yapıya sahiptir.

                Arcanis Projesi olarak, sizinle birlikte daha nice yolculuklara çıkmayı ve seyahat deneyimlerinizi mükemmel kılmayı sabırsızlıkla bekliyoruz. Teşekkür ederiz ki bizimle birlikte olduğunuz için!
                </p>
            </div>
        </div>
    )
}
