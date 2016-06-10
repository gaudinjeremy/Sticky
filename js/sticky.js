$(function() {
    $('[data-toggle="tooltip"]').tooltip()
    $('.toSwipe').on("swipeup", SwipeUp);
    $('.toSwipe').on("swipedown", SwipeDown);
    ToLoad('dossiers');
});

function SwipeLeft() {

    $(this).addClass('list-group-item-danger');
    $(this).attr('onclick', 'ClearOneListe(this.id);');
    $('#name_'+this.id).addClass('hide');
    $('#del_'+this.id).removeClass('hide');
};

function SwipeRight() {

    $(this).removeClass('list-group-item-danger');
    $(this).attr('onclick', 'selectDossier(this.id, this.name)');
    $('#name_'+this.id).removeClass('hide');
    $('#del_'+this.id).addClass('hide');
};

function SwipeUp() {

    $('.container-input').css('top', '-100px') ;
};

function SwipeDown() {

    $('.container-input').css('top', '50px') ;
    $('#input').focus();
};

function ToLoad(page) {

    $('#content').load(page+'.html');
};

function TheTime() {

    return Math.floor(Date.now() / 1000) ;
};

function nouvelleListe() {

    localStorage.setItem('dossier-'+TheTime(), $('#input').val());

    $('#input').val('');
    ToLoad('dossiers');
    SwipeUp() ;
};

function nouvelItem() {

    dossier = JSON.parse(localStorage.getItem('refDossier'));
    item = {
        dossier : dossier.ref,
        item : $('#input').val(),
        class : ''
    };

    localStorage.setItem('item-'+TheTime(), JSON.stringify(item));

    $('#input').val('');
    ToLoad('items');
    SwipeUp() ;
};

function selectDossier(id, name){

    dossier = {
        ref : id,
        nom : name
    };

    localStorage.setItem('refDossier', JSON.stringify(dossier));

    ToLoad('items');
    $('.nouvelItem').show('slow');
    $('.nouvelleListe').hide('slow');
}

function listeDossiers() {

    total = 0 ;

    for (var i in localStorage) {

        iSplit = i.split('-');

        if (iSplit[0] === 'dossier') {

            if (compteItems(i) === 0) {

                color = 'success';
            }
            else {

                color = 'warning';
            }

            $('#listeDossiers').append("<a href='#' id='"+i+"' name='"+localStorage[i]+"' class='list-group-item toSwipeLeft toSwipeRight' onclick='selectDossier(this.id, this.name)'> <span id='name_"+i+"'>"+localStorage[i]+" <span class='badge badge-"+color+" pull-right'>"+compteItems(i)+"</span></span> <span id='del_"+i+"' class='hide'>Supprimer</span></a>");
            total++ ;
        }
    }

    if (total === 0) {

        $('#listeDossiers').append("<a href='#' class='list-group-item'>Liste vide</a>") ;
    }
};

function compteItems(liste) {

    nombre = 0 ;

    for (var i in localStorage) {

        iSplit = i.split('-');

        if (iSplit[0] === 'item') {

            items = JSON.parse(localStorage[i]);

            if (items.dossier === liste) {

                if (items.class === '') {

                    nombre++ ;
                }
            }
        }
    }
    return nombre ;
};

function listeItems() {

    total = 0 ;
    dossier = JSON.parse(localStorage.getItem('refDossier'));

    $('#nomDossier').html(dossier.nom);

    for (var i in localStorage) {

        iSplit = i.split('-');

        if (iSplit[0] === 'item') {

            items = JSON.parse(localStorage[i]);

            if (items.dossier === dossier.ref) {

                $('#listeItems').append("<a href='#' id='"+i+"' class='list-group-item "+items.class+"' onclick='changeClass(this.id);'>"+items.item+"</a>") ;
                total++ ;
            }
        }
    }

    if (total === 0) {

        $('#listeItems').append("<a href='#' class='list-group-item'>Liste vide</a>") ;
    }
};

function changeClass(id) {

    thisItem = JSON.parse(localStorage.getItem(id));

    if (thisItem.class === 'disabled') {

        newClass = '';
    }
    else {

        newClass = 'disabled';
    }

    newItemClass = {
        dossier : thisItem.dossier,
        item : thisItem.item,
        class : newClass
    };
    localStorage.setItem(id, JSON.stringify(newItemClass));
    ToLoad('items');
};

function ClearAll() {

    localStorage.clear();
    ToLoad('dossiers');
};

function ClearOneListe(liste){

    localStorage.removeItem(liste);

    for (var i in localStorage) {

        iSplit = i.split('-');

        if (iSplit[0] === 'item') {

            items = JSON.parse(localStorage[i]);

            if (items.dossier === liste) {

                localStorage.removeItem(i);
            }
        }
    }
    ToLoad('dossiers');
};

// Avec la méthode "match"
function listeItems2() {

    total = 0 ;
    dossier = JSON.parse(localStorage.getItem('refDossier'));

    $('#nomDossier').html(dossier.nom);

    for (var i in localStorage) {

        if (i.match(/item.*/)) {

            items = JSON.parse(localStorage[i]);

            if (items.dossier === dossier.ref) {

                $('#listeItems').append("<a href='#' id='"+i+"' class='list-group-item "+items.class+"' onclick='changeClass(this.id);'>"+items.item+"</a>") ;
                total++ ;
            }
        }
    }

    if (total === 0) {

        $('#listeItems').append("<a href='#' class='list-group-item'>Liste vide</a>") ;
    }
};
