export {};

type HTMLElementWithId<T extends string> = HTMLElement & { id?: T };

function addIconToNews(): void {
const iconTemplate = document.createElement('img'); //содание иконки
iconTemplate.src = chrome.runtime.getURL("src/contentScripts/weather.png"); //использование chrom extension api для создания полного url
iconTemplate.style.width = '48px';
iconTemplate.style.height = '48px';
iconTemplate.style.border = 'none';
iconTemplate.style.cursor = 'pointer';

const storyWraps = document.querySelectorAll('.story-wrap');

storyWraps.forEach((storyWrap) => {
  const clonedIcon = iconTemplate.cloneNode(true) as HTMLImageElement; //клонирование иконки
  storyWrap.appendChild(clonedIcon); //вставка иконка в блок новостей
  clonedIcon.addEventListener('click', openModal);
});

  const modal: HTMLDivElement = document.createElement('div') as HTMLDivElement; //создание модального окна с погодой
  modal.id = 'myModal';
  chrome.storage.sync.get(['selectedCity'], function(result) {
    let cityName = result.selectedCity; //получение названия города
    const apiKey = '60d830e457c209d456431b29c7526ecc'; 

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {
            let temperature = Math.round(data.main.temp - 273.15); //преобразование в градусы цельсия
            let description = data.weather[0].description; //краткое описание погоды

            let selectedCity = `Погода ${cityName} ${temperature}°C, ${description}`;
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close" style="float: right; cursor: pointer;">&times;</span>
                    <br>
                    <p>${selectedCity}</p>
                </div>`;
        })
        .catch(error => console.error('Error fetching weather:', error));
});


  modal.style.display = 'none'; //свойства модального окна
  modal.style.position = 'fixed';
  modal.style.zIndex = '1';
  modal.style.left = '45%';
  modal.style.top = '45%';
  modal.style.width = '200px';
  modal.style.height = '100px';
  modal.style.overflow = 'auto';
  modal.style.fontWeight = 'bold';
  modal.style.backgroundColor = 'beige';

  document.body.appendChild(modal); //добавление окна в документ

  function closeModal(): void {
    modal.style.display = 'none';
  }

  modal.addEventListener('click', function(event: MouseEvent): void { //обработчик события для закрытия модального окна
    if (event.target === modal || event.target instanceof HTMLElement && event.target.classList.contains('close')) {
      closeModal();
    }
  });

  function openModal(): void {
    modal.style.display = 'block';
  }

}

addIconToNews();
