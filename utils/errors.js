const express = require('express');

express.response.error = function(error) {
    if (!error.code) {
        error = {
            message: error.toString(),
            code: 'server_error',
            status: 500
        };
    }

    this.status(error.status).send(error);
};

module.exports = {
    emptyData: {
        message: 'data is empty, please return entered',
        code: 'data empty',
        status: 400
    },
    undefinedData: {
        message: 'data is undefined, please return entered',
        code: 'data undefined',
        status: 401
    },
    invalidId: {
        message: 'Bad request',
        code: 'bad_request',
        status: 400
    },
    notFound: {
        message: 'Entity not found',
        code: 'entity_not_found',
        status: 404
    },
    wrongCredentials: {
        message: 'Email or password are wrong',
        code: 'wrong_credentials',
        status: 404
    },
    accessDenied: {
        message: 'Access denied',
        code: 'access_denied',
        status: 403
    },
    Unauthorized: {
        message: 'Unauthorized',
        code: 'unauthorized',
        status: 401
    },
    PaymentRequired: {
        message: 'Payment Required',
        code: 'payment_equired',
        status: 402
    }

};