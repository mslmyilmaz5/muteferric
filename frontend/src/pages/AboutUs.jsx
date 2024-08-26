import React from 'react'
import '../css/AboutUs.css';
import Navbar from '../components/header';

export const AboutUs = () => {
  return (
    <div id="about-us-content">
      <div className="navbar-login"><Navbar /></div>
      <div id="about-us-left"></div>
      <div id="about-us-main-content">
        <div id="about-us-main-head"><p>Müteferriç</p></div>
        <div id="about-us-main-content">
          <p>
            İnsanoğlunun uğraş verdiği en kadim sanat şüphesiz şiirdir. Bilimsel bilgi açısından bu böyle olmasa bile bizim için fark etmez çünkü şiir insanın kendisi olma hüviyetini taşır. 
            Neredeyse diğer bütün sanat faaliyetleri doğayı taklit etmenin -ucundan yahut kıyısından ama mutlaka bir şekilde- bir sonucu olarak karşımıza çıkarken; şiirin böyle olmadığı çok açıktır. 
            Şiir bizzat bir yaratımdır.
          </p>
          <br></br>
          <p>
            Burası müteferriçlerin, yolda olanların, belki varabilecek belki varamayacak olanların -ya da bunu umursamayanların- toplandığı bir şiir alanı. Sıkıntısını, hüznünü, derdini; 
            gezerek, dolaşarak gideren -en azından gidermeye çalışan- müteferriçler olarak bizler bu şiir alanında ister kendi yazı ve şiirlerimizi paylaşarak ister “vardığını” düşündüğümüz şairlerin 
            şiirlerini okuyarak dolaşabiliriz. Bu alanda paylaşılan şiir veya yazıları diğer müteferriçlerle paylaşmak ve bu sayede belki de dolaşan diğer insanları rahatlatmak yahut bu eserleri kendinize 
            saklamak mümkün.
          </p>
          <br></br>
          <p>
            Anlamak muhakkak ki yüce bir şey. İnsanı dolayısıyla başta da dediğimiz gibi şiiri külliyen anlamak belki mümkün değil fakat kısmen anlamak mümkün. Burada dolaşan, burada dolaşmayı tercih eden 
            ve burada içinin rahatladığını hisseden herkesi sırf bu yüzden bile “kısmen” anlayabileceğimize inanıyoruz.
          </p>
          <br></br>
          <p>
            Müteferriçler olarak şiir ve yazılarda rast gelmek dileğiyle..
          </p>
          </div>
      </div>
      <div id="about-us-right"></div>
      <div className="footer">
        <p>&copy; 2024 Müteferriç.</p>
      </div>
    </div>
  )
}

export default AboutUs;