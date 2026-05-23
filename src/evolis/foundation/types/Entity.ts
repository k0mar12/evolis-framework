import type { Component } from '../core/Component';
import type { EntityId } from './EntityId';

type Components = {

};

export type Entity = {
    id: EntityId,
    components: Component
};
