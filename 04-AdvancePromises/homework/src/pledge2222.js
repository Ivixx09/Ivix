'use strict';
/*----------------------------------------------------------------
Promises Workshop: construye la libreria de ES6 promises, pledge.js
----------------------------------------------------------------*/
// // TU CÓDIGO AQUÍ:
function $Promise(executor) {
    if(typeof executor !== 'function') throw TypeError('Executor must be a function')
    this._state = 'pending'
    this._handlerGroups = []
    executor(this._internalResolve.bind(this), this._internalReject.bind(this))
}

$Promise.prototype._internalResolve = function (value) {
    if(this._state === 'pending'){
        this._state = 'fulfilled'
        this._value = value
        this._callHandlers()
    } 
}

$Promise.prototype._internalReject = function (reason) {
    if(this._state === 'pending'){
        this._state = 'rejected'
        this._value = reason
        this._callHandlers()
    }
}

$Promise.prototype._callHandlers = function() {
    while (this._handlerGroups.length) {
        const hd = this._handlerGroups.shift()
        if(this._state === 'fulfilled'){
            if(hd.successCb){
                try {
                const result = hd.successCb(this._value)
                    if(result instanceof $Promise){
                    // Handler Resuelve a promise. P
                    return result.then(
                        data => hd.downstreamPromise._internalResolve(data),
                        error => hd.downstreamPromise._internalReject(error)
                    )
                    } else {
                    // Handler Resuelve a value. V
                    hd.downstreamPromise._internalResolve(result)
                    }
                } catch (error) {
                hd.downstreamPromise._internalReject(error)
                }
            } else {
                hd.downstreamPromise._internalResolve(this._value)
            }
        } else if(this._state === 'rejected'){
            if(hd.errorCb){
                try {
                const result = hd.errorCb(this._value)
                if(result instanceof $Promise){
                    return result.then(
                        data => hd.downstreamPromise._internalResolve(data),
                        error => hd.downstreamPromise._internalReject(error)
                    )
                } else {
                    hd.downstreamPromise._internalResolve(result)
                }
               } catch (error) {
                hd.downstreamPromise._internalReject(error)
               }
            } else {
                hd.downstreamPromise._internalReject(this._value)
            }
        }
    }
}

$Promise.prototype.then = function(successCb, errorCb) {
    if(typeof successCb !== 'function') successCb = false
    if(typeof errorCb !== 'function') errorCb = false

    const downstreamPromise = new $Promise(() => {})

    this._handlerGroups.push({
        successCb,
        errorCb,
        downstreamPromise
    })

    if(this._state !== 'pending') this._callHandlers()
    return downstreamPromise
}

$Promise.prototype.catch = function(errorCb) {
    return this.then(null, errorCb)
}

// P1 ---> .then(value => {console.log()})

// status = fulfilled

// p1.then()

createPromise()
    .then(data => {
        
        return createPromise() // assimilation
    })
    .then(data => {

    })

module.exports = $Promise;
/*-------------------------------------------------------
El spec fue diseñado para funcionar con Test'Em, por lo tanto no necesitamos
realmente usar module.exports. Pero aquí está para referencia:

module.exports = $Promise;

Entonces en proyectos Node podemos esribir cosas como estas:

var Promise = require('pledge');
…
var promise = new Promise(function (resolve, reject) { … });
--------------------------------------------------------*/
