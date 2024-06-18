const baseUrl = "https://love1ace.github.io/random-pepes/img";

const NUMBER_OF_PEPES = 5107;

const extensions = ["jpg", "png", "gif"]; // 가능한 확장자 목록

// 랜덤 숫자 생성 함수
function getRandomNumber(max, min = 1) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 이미지를 로드하고 DOM 요소에 추가하는 함수
export default async function RandomPepe(Element) {
  const PEPE_Index = getRandomNumber(NUMBER_OF_PEPES);

  const Directory_Number =
    PEPE_Index % 1000 !== 0
      ? parseInt(PEPE_Index / 1000) + 1
      : parseInt(PEPE_Index / 1000);
  const Directory = `img_${Directory_Number}`;

  const url = `${baseUrl}/${Directory}/pepe${PEPE_Index}`;
  const imageUrl = await getImageUrl(url, extensions);

  const img = `<img src="${imageUrl}" alt="your_ultimate_pepe id='pepe'">`;

  Element.innerHTML += img;
}

// 확장자를 결정하는 함수
async function getImageUrl(url, extensions) {
  for (const ext of extensions) {
    let imageUrl = url + "." + ext;
    try {
      const response = await fetch(imageUrl);
      if (response.ok) {
        return imageUrl;
      }
    } catch (error) {
      console.error(`Error fetching image ${imageUrl}:`, error);
    }
  }
  return console.error("fetch error");
}
