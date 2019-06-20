'use strict';

/**
 * Simple delay in Promise chaining.
 *
 * @param {number} time
 * @returns {Promise}
 */
function delay(time = 100) {
    return new Promise((resolve, reject) => {
        let isEven = (time % 2 === 0);
        setTimeout(() => {
            isEven ? resolve() : reject(time);
        }, time);
    });
}

describe('Testing Promise.catch', () => {
    it('catche after rejection then in chain', (done) => {
        Promise.resolve()
            .then(() => delay(201))
            .catch((time) => {
                expect(true).toEqual(true);
                expect(time).toEqual(201);
                done();
            });
    });

    it('catche as first in chain', (done) => {
        Promise.resolve()
            .catch((time) => {
                expect(true).toEqual(false);
                expect(time).toEqual(0);
            })
            .then(() => delay(201))
            .catch(() => {
                expect(true).toEqual(true);
                done();
            });
    });

    it('double catche-s', (done) => {
        Promise.resolve()
            .then(() => delay(100))
            .then(() => delay(101))
            .catch((time) => {
                expect(true).toEqual(true);
                expect(time).toEqual(101);
            })
            .then(() => delay(201))
            .then(() => delay(102))
            .catch((time) => {
                expect(true).toEqual(true);
                expect(time).toEqual(201);
                done();
            });
    });
});
