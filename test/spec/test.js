/* global describe, it, $, Book, List */

(function () {
    'use strict';

    describe('Some variables should be available.', function () {
        describe('A Book object', function () {
            it('should have a url', function () {
                var book = new Book('abstract-folder-file_json');
                expect(book.url).to.equal('folder/file.json');
            });
        });
        describe('A Book object', function () {
            it('should be available', function () {
                expect(Book).to.exist;
            });
        });
        describe('jQuery', function () {
            it('should be here', function () {
                expect($).to.exist;
            });
        });
        describe('List', function () {
            it('should be here', function () {
                expect(List).to.exist;
            });
        });
    });
})();
