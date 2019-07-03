const { STATUS, momentjs} = require('../lib')

module.exports = {
    rest404: (req, res) => {
        const err = new Error(`Not Found [${req.url}]`)
        const { url, method, params, query, body, _startTime } = req
        
        const request = {
            method,
            url,
            recived: momentjs(_startTime).utcOffset('-07:00').format('MMMM Do YYYY, hh:mm:ssa'),
        }

        return res.status(STATUS.NOT_FOUND).json({
            error: {
                status: STATUS.NOT_FOUND,
                message: err.message,
                time: momentjs(Date.now()).utcOffset('-07:00').format('MMMM Do YYYY, hh:mm:ssa'),
                request
            },
        })
    },

    restErrorsHandler: (error, req, res) => {
        res.statusMessage = error.message || 'Opps! Something went wrong.'
        return res.status(error.status || STATUS.BAD_REQUEST).json({
            error: {
                message: error.message || 'Opps! Something went wrong.',
                time: momentjs(Date.now()).utcOffset('-07:00').format('MMMM Do YYYY, h:mm:ssa'),
            },
        })
    },
}
