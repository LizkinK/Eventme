$(function() {
  Dropzone.options.myDropzone = {
    previewsContainer: ".dropzone-previews",
    addRemoveLinks: 'dictRemoveFile',
    uploadprogress: function(file, progress, bytesSent) {
      console.log(file, progress);
      $('.registration-next').addClass('successful-download');
      $('.regictration-photo__photo-upload__progress__info').text(`Загружено ${progress}%`);
      $('.regictration-photo__photo-upload__topic').text(`Выбрать ещё фото`);
      
    },
    previewTemplate: document
    .querySelector('#tpl')
    .innerHTML 
  }
  
})