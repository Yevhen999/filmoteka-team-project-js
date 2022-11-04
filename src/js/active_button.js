// ✅ Заміна класів is-active
import { refs } from './refs';

refs.libraryListButtons.addEventListener('click', onButtonClick);

export function onButtonClick(event) {
  if (event.target.nodeName !== 'BUTTON') {
    return;
  }

  const currentActiveBtn = refs.libraryListButtons.querySelector('.is-active');
  //   console.log(currentActiveBtn);
  if (currentActiveBtn) {
    currentActiveBtn.classList.remove('is-active');
    //  console.log('remove class is-active');
  }
  // додає клас на кнопку на яку клікнули
  event.target.classList.add('is-active');
  // console.log('add class is-active');
}
