import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Ошибка
export const errorToast = msg => {
  return iziToast.show({
    class: 'custom-error-toast',
    timeout: 4000,
    close: true,
    overlay: false,
    position: 'topRight',
    title: '',
    message: msg,
    progressBar: false,
    transitionIn: 'fadeInDown',
    transitionOut: 'fadeOutUp',
    closeOnClick: true,
  });
};

// Info
export const infoToast = msg => {
  return iziToast.show({
    class: 'custom-info-toast',
    timeout: 3000,
    close: true,
    overlay: false,
    position: 'topRight',
    title: '',
    message: msg,
    progressBar: false,
    transitionIn: 'fadeInDown',
    transitionOut: 'fadeOutUp',
    closeOnClick: true,
  });
};
