import {Component, Input, OnInit} from '@angular/core';
import {Program} from './program';

@Component({
    selector: 'program-additional-data',
    template: '{{data}}'
})
export class ProgramAdditionalDataComponent implements OnInit {

    @Input()
    program: Program;
    data: string;

    ngOnInit(): void {
        if (this.program) {
            this.data = Program.getAdditionalData(this.program);
        }
    }

}
