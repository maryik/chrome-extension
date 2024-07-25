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
  chrome.storage.sync.get(['selectedCity'], function(result) { //использование chrom extension api для хранения данных
    let selectedCity
    if(result.selectedCity === "Минск"){
        selectedCity = "Погода " + result.selectedCity + " 30 градусов тепла";
    }
    else if(result.selectedCity === "Брест"){
        selectedCity = "Погода " + result.selectedCity + " 25 градусов тепла, кратковременные дожди";
    }
    else{
        selectedCity = "Погода " + result.selectedCity + " 18 градусов облачно"
    }
    // вставка информации о погоде по выбранному городу в modal
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" style="float: right; cursor: pointer";>&times;</span>
            <br>
            <p>${selectedCity}</p>
        </div>`;
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
