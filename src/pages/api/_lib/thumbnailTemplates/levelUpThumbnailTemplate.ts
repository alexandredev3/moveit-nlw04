export function getLevelUpThumbnailTemplate(
  level: number, 
  challengesCompleted: number, 
  currentExperience: number
) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Level up Thumb</title>
    
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Rajdhani:wght@600&display=swap" rel="stylesheet" />
    
      <style>
        .container {
          margin: 8vh auto;
    
          max-width: 1100px;
          width: 100%;
    
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
    
        .container .levelup__container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
    
          font-family: Inter;
        }
    
        .container .levelup__container h2 {
          color: #2E384D;
    
          font-weight: 600;
          font-size: 42px;
          line-height: 66px;
        }
    
        .container .levelup__container .levelup {
          width: 400px;
          height: 400px;
    
          background: url('/icons/levelup.svg') no-repeat;
          background-size: contain;
    
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
    
        .container .levelup__container .levelup h1 {
          font-size: 400px;
    
          color: #4953B8;
          text-shadow: 0px 10px 16px rgba(89, 101, 224, 0.3);
        }
    
        .infos__container {
          display: flex;
          flex-direction: column;
    
        }
    
        .infos__container strong {
          text-transform: uppercase;
    
          font-family: Inter;
          font-weight: bold;
          font-size: 24px;
          color: #666666;
    
          line-height: 29px;
        }
    
        .infos__container span {
          font-family: Inter;
          font-style: normal;
          font-weight: 500;
          font-size: 40px;
          line-height: 48px;
    
    
          color: #666666;
    
          padding: 12px 0;
        }
    
        .infos__container span strong {
          font-size: 40px;
    
          color: #5965E0;
        }
    
        .infos__container .challenges__wrapper {
          display: flex;
          flex-direction: column;
        }
    
        .infos__container .challenges__wrapper span {
          margin-bottom: 18px;
        }
    
        .infos__container .experience__wrapper {
          display: flex;
          flex-direction: column;
    
          border-bottom: 1.5px solid #DCDDE0;
          border-top: 1.5px solid #DCDDE0;
        }
    
        .infos__container .experience__wrapper strong {
          margin-top: 32px;
        }
    
        .infos__container .experience__wrapper span {
          margin-bottom: 18px;
        }
    
        .infos__container .experience__wrapper {
          display: flex;
          flex-direction: column;
        }
    
        .infos__container .logo__wrapper {
          margin-top: 140px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="levelup__container">
          <div class="levelup">
            <h1>${level}</h1>
          </div>
          <h2>Avancei para o próximo level</h2>
        </div>
        <div class="infos__container">
          <div class="challenges__wrapper">
            <strong>Desafios</strong>
            <span>
              <strong>${challengesCompleted}</strong> Completados
            </span>
          </div>
          <div class="experience__wrapper">
            <strong>Experiência</strong>
            <span>
              <strong>${currentExperience}</strong> xp
            </span>
          </div>
          <div class="logo__wrapper">
            <svg width="250" height="50" viewBox="0 0 250 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0)">
              <path d="M107.307 22.0488L103.685 38.6822H94.2489L97.8712 22.0488C98.1551 20.7414 97.9905 20.5004 96.6534 20.5004H93.2468C91.9182 20.5004 91.64 20.7414 91.359 22.0155C91.359 22.0155 91.359 22.0377 91.359 22.0488L87.7367 38.6822H78.2919L81.9171 22.0488C82.201 20.7414 82.0363 20.5004 80.6964 20.5004H77.2898C75.9499 20.5004 75.6802 20.7441 75.3963 22.0488L71.7712 38.6822H62.335L67.8962 13.149H75.561L76.776 15.3428C77.4749 14.6247 78.321 14.0583 79.2591 13.6803C80.1972 13.3023 81.2063 13.1213 82.2208 13.149H84.1768C87.8672 13.149 90.3569 14.714 91.2483 17.3593C92.8976 14.4176 95.2879 13.149 98.175 13.149H100.134C105.678 13.149 108.497 16.6419 107.307 22.0488Z" fill="#5965E0"/>
              <path d="M136.084 22.0487L134.401 29.7824C133.223 35.1893 128.879 38.6821 123.329 38.6821H116.181C110.64 38.6821 107.821 35.1865 108.999 29.7796L110.682 22.0487C111.858 16.6418 116.201 13.1489 121.754 13.1489H128.913C134.443 13.1489 137.265 16.6418 136.084 22.0487ZM126.639 22.0487C126.923 20.7413 126.759 20.5003 125.422 20.5003H122.015C120.675 20.5003 120.405 20.7441 120.122 22.0487L118.435 29.7796C118.151 31.087 118.319 31.328 119.656 31.328H123.063C124.4 31.328 124.672 31.0842 124.956 29.7796L126.639 22.0487Z" fill="#5965E0"/>
              <path d="M194.976 20.0156C194.631 21.467 193.797 22.7639 192.608 23.6996L187.802 27.5775C186.65 28.523 185.2 29.0548 183.695 29.0843H177.04L176.89 29.7685C176.606 31.0759 176.771 31.3169 178.111 31.3169H192.509L190.908 38.671H174.625C169.083 38.671 166.264 35.1754 167.442 29.7685L169.126 22.0376C170.304 16.6307 174.647 13.1378 180.197 13.1378H187.362C192.89 13.1489 195.748 16.459 194.976 20.0156ZM185.091 22.0487C185.375 20.7413 185.211 20.5003 183.871 20.5003H180.464C179.13 20.4975 178.846 20.744 178.562 22.0487L177.994 24.7106H183.615C183.867 24.7004 184.109 24.6102 184.304 24.4537C184.498 24.2972 184.635 24.083 184.694 23.8436L185.091 22.0487Z" fill="#5965E0"/>
              <path d="M205.583 34.3471C205.061 36.7431 203.122 38.6849 200.19 38.6849C197.257 38.6849 196.167 36.7459 196.689 34.3471C197.212 31.9484 199.151 30.0122 202.083 30.0122C205.016 30.0122 206.097 31.9484 205.583 34.3471Z" fill="#4CD62B"/>
              <path d="M225.83 13.1489L224.229 20.4975L220.255 38.6794H210.821L214.796 20.4975H210.086L211.69 13.1461L225.83 13.1489ZM218.824 8.38186C217.189 6.60911 217.688 3.56772 219.934 1.59276C222.179 -0.382197 225.328 -0.542853 226.971 1.23267C228.615 3.0082 228.107 6.04958 225.861 8.02454C223.616 9.9995 220.462 10.1602 218.824 8.38186Z" fill="#5965E0"/>
              <path d="M240.972 16.8246L238.15 29.7796C237.866 31.087 238.031 31.328 239.368 31.328H245.236L243.635 38.6821H235.888C230.346 38.6821 227.525 35.1865 228.703 29.7796L231.524 16.8246H227.956L229.557 9.47044H233.134L234.446 3.44861H243.89L242.579 9.47044H250.005L248.395 16.8246H240.972Z" fill="#5965E0"/>
              <path d="M25.5092 3.745H37.4834L27.522 50H15.5479L25.5092 3.745Z" fill="#5965E0"/>
              <path d="M43.0786 3.745H55.0527L47.2914 39.9868H35.3145L43.0786 3.745Z" fill="#5965E0"/>
              <path d="M7.76415 3.745H19.7383L11.9769 39.9868H0L7.76415 3.745Z" fill="#5965E0"/>
              <path d="M171.026 13.1489L153.531 38.6821H143.879L137.497 13.1489H147.833L150.612 29.9153L160.69 13.1628L171.026 13.1489Z" fill="#5965E0"/>
              </g>
              <defs>
              <clipPath id="clip0">
              <rect width="250" height="50" fill="white"/>
              </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}