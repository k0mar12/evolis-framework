import { Component } from '../core/Component';

export type ComponentConstructor = abstract new(...args: any[]) => Component;
