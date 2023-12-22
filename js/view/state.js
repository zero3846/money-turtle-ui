const models = new Map();

function assert(condition, failMessage) {
    if (!condition) { throw failMessage; }
}

export function useModel(modelId, state) {
    assert(modelId, `Model ID cannot be undefined or blank.`);

    if (models.has(modelId)) {
        // Set the state for the existing model
        const model = models.get(modelId);
        model.state = state;
        emit(modelId, 'updated');
    } else {
        // Create a new model with the given state
        models.set(modelId, {
            state: state,
            listeners: new Map(),
            nextListenerId: 0
        });
    }
}

export function getModelState(modelId) {
    assert(models.has(modelId), `Model does not exist: ${modelId}`);

    return models.get(modelId).state;
}

export function removeModel(modelId) {
    assert(models.has(modelId), `Model does not exist: ${modelId}`);

    models.delete(modelId);
}

export function listen(modelId, eventType, callback) {
    assert(models.has(modelId), `Model does not exist: ${modelId}`);
    assert(eventType && eventType.length > 0, `Invalid event type: ${eventType}`);
    assert(callback && typeof callback === 'function', `Unexpected callback type: ${typeof callback}`);

    const model = models.get(modelId);
    const listenerId = model.nextListenerId;
    model.listeners.set(listenerId, {
        eventType: eventType,
        callback: callback
    });
    model.nextListenerId++;

    return listenerId;
}

export function unlisten(modelId, listenerId) {
    assert(models.has(modelId), `Model does not exist: ${modelId}`);

    const model = models.get(modelId);

    assert(model.listeners.has(listenerId), `Listener ${listenerId} does not exist on model ${modelId}`);

    model.listeners.delete(listenerId);
}

export function emit(modelId, eventType, eventData) {
    assert(models.has(modelId), `Model does not exist: ${modelId}`);

    const model = models.get(modelId);
    
    for (const listener of model.listeners.values()) {
        if (listener.eventType === eventType) {
            listener.callback({
                type: eventType,
                data: eventData,
                state: model.state
            });
        }
    }
}