import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Program} from './program';
import {ProgramService} from './program.service';

@Component({
    selector: 'program-list',
    templateUrl: './program.list.component.html'
})
export class ProgramListComponent implements OnInit {

    programs: Program[];
    mediaCount: number;

    constructor(private programService: ProgramService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.updateData();
    }

    update(program: Program): void {
        this.router.navigate(['/programs/edit', program.id]);
    }

    duplicate(program: Program): void {
        this.programService.duplicate(program).then(response => this.updateData());
    }

    remove(program: Program): void {
        this.programService.remove(program).then(response => this.updateData());
    }

    moveUp(program: Program): void {
        this.programService.moveUp(program).then(response => this.updateData());
    }

    moveDown(program: Program): void {
        this.programService.moveDown(program).then(response => this.updateData());
    }

    private updateData(): void {
        this.programService.list().then(programs => this.programs = programs);
        this.programService.totalMedia().then(mediaCount => this.mediaCount = mediaCount);
    }

}
