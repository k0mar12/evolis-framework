import { Component } from '@/evolis/foundation';

export type ComponentConstructor = abstract new(...args: any[]) => Component;
