import Dropzone from "dropzone";

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const myDropzone = new Dropzone("#my-form", {
    dictDefaultMessage: 'Arrastra tus imagenes aqui.',
    acceptedFiles: '.png, .jpg, .jpeg',
    maxFilesize: 5,
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: 'Remover',
    dictMaxFilesExceeded: 'El limite es 1 imagen.',
    headers: {
        'CSRF-token': token
    },
    paramName: 'image',
    init: function () {
        const dropzone = this;
        const publishBtn = document.querySelector('#publish');

        publishBtn.addEventListener('click', function () {
            dropzone.processQueue();
        });

        dropzone.on('queuecomplete', function () {
            const acceptedFiles = myDropzone.getAcceptedFiles();

            if (acceptedFiles.length > 0) {
                window.location.href = '/my-properties';
            } else {
                alert('No se subió ninguna imagen válida.');
            }
        });
    }
});

const output = document.querySelector("#output");

myDropzone.on("addedfile", (file) => {
    // Add an info line about the added file for each file.
    output.innerHTML += `<div>File added: ${file.name}</div>`;
});