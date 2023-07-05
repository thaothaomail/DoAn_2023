import React from 'react'
import { Tabs } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import Tongquan from './Tongquan';
import Chinhsach from './Chinhsach';
import Ghichu from './Ghichu';
export default function Tabss() {
    const { TabPane } = Tabs;
    const renderTabBar = (props, DefaultTabBar) => (
        <Sticky bottomOffset={80}>
            {({ style }) => (
                <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
            )}
        </Sticky>
    );
    return (
        <div className="mb-5">
            <StickyContainer>
                <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
                    <TabPane tab="Tổng quan" key="1" >
                        <Tongquan />
                    </TabPane>
                    <TabPane tab="Chính sách" key="2">
                        <Chinhsach />
                    </TabPane>
                    <TabPane tab="Ghi chú" key="3">
                        <Ghichu />
                    </TabPane>
                </Tabs>
            </StickyContainer>
        </div>
    )
}
