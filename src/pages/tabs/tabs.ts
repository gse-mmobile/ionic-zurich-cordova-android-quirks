import {Component, ViewChild} from '@angular/core';

import {AboutPage} from '../about/about';
import {ContactPage} from '../contact/contact';
import {HomePage} from '../home/home';
import {Tabs} from 'ionic-angular';
import {TabsService} from '../../providers/tabs-service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  @ViewChild('myTabs') tabRef: Tabs;

  private tabIndexSubscriber: Subscription;

  constructor(private tabsService: TabsService) {

  }

  ionViewDidLoad() {
    this.tabIndexSubscriber = this.tabsService.tabIndex.subscribe((index: number) => {
      this.tabRef.select(index);
    });
  }

  ionViewWillLeave() {
    if (this.tabIndexSubscriber) {
      this.tabIndexSubscriber.unsubscribe();
    }
  }
}
