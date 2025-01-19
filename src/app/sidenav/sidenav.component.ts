import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navbarData } from './sidenav-data';
import { subNavbarData } from './sidenav-dropdown-data';
interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  
  @Output() onToggleSideNav:EventEmitter<SideNavToggle>=new EventEmitter();
  collapsed=false;
  screenWidth=0;
  navData=navbarData;
  subNavData=subNavbarData;
  
  @HostListener("window:resize",["$event"])
  onResize(event:any){
    this.screenWidth=window.innerWidth;
    if(this.screenWidth<=768){
      this.collapsed=false;
      this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth})
    }
  }
  ngOnInit(): void {
    this.screenWidth=window.innerWidth;
   }

  toggleCollapse():void{
    this.collapsed=!this.collapsed;

    this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth})
  }
  closeSidenav():void{
    this.collapsed=false;
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth})
  }
  openSidenav():void{
    this.collapsed=true;
    this.onToggleSideNav.emit({collapsed:this.collapsed,screenWidth:this.screenWidth})
  }
  getSubNavbarData(id:number){
    return subNavbarData.filter(p=>p.id==id);
  }
}
