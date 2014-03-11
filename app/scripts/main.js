/* globals $, List */

// Avoid the global
(function(exports) {
    'use strict';
    /**
     * View
     */
    var $sidebarButton = $('.ui.black.launch.right.button'),
        $sidebar = $('.ui.sidebar'),
        $book = $('.segment.book'),
        book = null;

    // Toggle sidebar
    $sidebarButton.click(function(){
        $sidebar.sidebar('toggle');
    });

    // Register listeners
    $sidebar
        .on('click', '.item', function() {
            var $selectedAbstract = $(this).attr('data-book'),
                $shownAbstract = $('.ui.piled.segment:not(.hide)');

            $('#features').hide();
            $book.addClass('hide');
            $shownAbstract.addClass('hide');
            $('#abstract-' + $selectedAbstract).removeClass('hide');
            $sidebar.sidebar('toggle');
        })
        .on('click', '.search', function(el) {
            el.stopPropagation();
        });

    $('.read').on('click', function() {
        $book.removeClass('hide');
        book = new Book($(this).parents('.piled').attr('id'));
    });

    // Previous and next book chapter buttons
    $book
        .on('click', '.previous', function() {
            book.getPreviousChapter();
        })
        .on('click', '.next', function() {
            book.getNextChapter();
        });

    $('.message .close').on('click', function() {
        $(this).closest('.message').fadeOut();
    });

    // Search book list
    var listOptions = {
        valueNames: ['header', 'author'],
        searchClass: 'search'
    };

    var bookList = new List('books', listOptions);

    /**
     * @class Book
     */

    function Book (id) {
        this.file = id;
        this.url = id.replace(/\-/g, '/').replace(/_/g, '.').slice(9);
        this.chapters = [];
        this.chapterOpen = 0;
        this.meta = {};
        var self = this;

        getJSON(this.url).then(function(jsonBook) {
            var keys = Object.keys(jsonBook);

            keys.forEach(function(key) {
                if (!key.indexOf('Chapter')) {
                    self.chapters.push(jsonBook[key]);
                } else {
                    self.meta[key] = jsonBook[key];
                }
            });
        }).catch(function(err) {
            showError('Something when wrong.', url, err);
        }).then(function() {
            $('.ui.piled.segment:not(.hide)').addClass('hide');
            self.show();
            $('.loading').addClass('hide');
        });
    }

    Book.prototype.file = '';
    Book.prototype.url = '';

    exports.Book = Book;

    // Show book
    Book.prototype.show = function() {
         var content = '<div class="column"><article><div class="header">' + book.meta['Title'] + '</div><div class="chapter">'+ book.chapters[book.chapterOpen] + '</div></article><div class="ui left labeled icon button floated previous"><i class="left arrow icon"></i>Previous Chapter</div><div class="ui right labeled icon button floated next"><i class="right arrow icon"></i>Next Chapter</div></div>';
            $book.html(content);
            $book.removeClass('hide');
    };

    // Get first chapter of book
    Book.prototype.getFirstChapter = function() {
        $('.chapter').text(book.chapters[0]);
    };

    // Get next chapter of book
    Book.prototype.getNextChapter = function() {
        var next = (book.chapterOpen < book.chapters.length) ? book.chapterOpen += 1 : book.chapterOpen,
            content = book.chapters[next];
        $('.chapter').text(content);
    };

    // Get previous chapter of book
    Book.prototype.getPreviousChapter = function() {
        var previous = (book.chapterOpen > 0) ? book.chapterOpen -= 1 : 0,
            content = book.chapters[previous];
        $('.chapter').text(content);
    };

    // Get last chapter of book
    Book.prototype.getLastChapter = function() {
        $('.chapter').text(book.chapters[book.chapters.length - 1]);
    };

    /**
     * @function get via xhr and es6 promise
     */
    function get(url) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);

            xhr.onload = function() {
                if (xhr.status === 200) {
                    resolve(xhr.response);
                } else {
                    reject(Error(xhr.statusText));
                }
            };

            xhr.onerror = function() {
                reject(Error('Network Error'));
            };

            xhr.send();
        });
    }

    function getJSON(url) {
        return get(url).then(JSON.parse).catch(function(err) {
            showError('Could not get the file you wanted.', url, err);
        });
    }

    /**
     * Errors
     */
    function showError(msg, url, err) {
    // build message box
        var error = '<div class="ui error message"><i class="close icon"></i> <div class="header">Bummer there was an error that said: ' + msg + ' with a code of ' + err + ' for ' + url + '</div> </div>';
        // add to page
        $book.before(error);
    }

})(this);
