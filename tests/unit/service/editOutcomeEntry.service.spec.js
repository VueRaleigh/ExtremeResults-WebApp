import { module, inject } from "angular-mocks";

import "../../../app/entry/entry.module";

describe('EditOutcomeEntryService', function(){

    var httpBackend,
        Urls,
        EditOutcomeEntryService;

    beforeEach(module('xr.entry'));
    beforeEach(inject(function($httpBackend, _EditOutcomeEntryService_, _Urls_) {
        httpBackend = $httpBackend;
        EditOutcomeEntryService = _EditOutcomeEntryService_;
        Urls = _Urls_;
    }));

    describe('editOutcome', function () {
        it('should return on success', function () {
            var objectId = '123';
            httpBackend.whenPUT(Urls.baseApi + 'outcomes/' + objectId).respond(201);

            var resolved = false;
            EditOutcomeEntryService.editOutcome(objectId)
                .then(function () {
                    resolved = true;
                });

            httpBackend.flush();

            expect(resolved).toEqual(true);
        });

        it('should return error on failure', function () {
            var objectId = '1234';
            httpBackend.whenPUT(Urls.baseApi + 'outcomes/' + objectId).respond(500);

            var failed = false;
            EditOutcomeEntryService.editOutcome(objectId)
                .catch(function () {
                    failed = true;
                });

            httpBackend.flush();

            expect(failed).toEqual(true);
        });
    });

    describe('deleteOutcome', function () {
        it('should return on success', function () {
            var objectId = '123';
            httpBackend.whenDELETE(Urls.baseApi + 'outcomes/' + objectId).respond(201);

            var resolved = false;
            EditOutcomeEntryService.deleteOutcome(objectId)
                .then(function () {
                    resolved = true;
                });

            httpBackend.flush();

            expect(resolved).toEqual(true);
        });

        it('should return error on failure', function () {
            var objectId = '123';
            httpBackend.whenDELETE(Urls.baseApi + 'outcomes/' + objectId).respond(500);

            var failed = false;
            EditOutcomeEntryService.deleteOutcome(objectId)
                .catch(function () {
                    failed = true;
                });

            httpBackend.flush();

            expect(failed).toEqual(true);
        });
    });

});