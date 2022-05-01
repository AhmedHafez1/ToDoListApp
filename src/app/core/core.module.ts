import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SideFilterComponent } from './side-filter/side-filter.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [SideNavComponent, SideFilterComponent],
  imports: [CommonModule, SharedModule],
  exports: [SideNavComponent],
})
export class CoreModule {}
