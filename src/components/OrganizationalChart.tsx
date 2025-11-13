'use client';

import React from 'react';

interface OrgNode {
  title: string;
  children?: OrgNode[];
  isGroup?: boolean;
}

const OrganizationalChart = () => {
  const orgStructure: OrgNode = {
    title: 'ADVISORY BOARD',
    children: [
      {
        title: 'CHIEF EXECUTIVE OFFICER',
        children: [
          {
            title: 'CHIEF OPERATIONS MANAGER',
            children: [
              {
                title: 'OPERATIONS',
                children: [
                  {
                    title: 'PROJECT MANAGER',
                    children: [
                      {
                        title: 'Group 1',
                        isGroup: true,
                        children: [
                          { title: 'LEAD QUANTITY SURVEYOR' },
                          { title: 'LEAD ARCHITECT' },
                          { title: 'LEAD ENGINEER' },
                          { title: 'ASST PROJECT MANAGER' },
                          { title: 'SENIOR INTERIOR DESIGNER' },
                        ],
                      },
                      {
                        title: 'Group 2',
                        isGroup: true,
                        children: [
                          { title: 'ASST QUANTITY SURVEYOR' },
                          { title: 'ASST ARCHITECTS' },
                          { title: 'LEAD ENGINEER' },
                          { title: 'ASST INTERIOR DESIGNER' },
                        ],
                      },
                      {
                        title: 'Group 3',
                        isGroup: true,
                        children: [
                          { title: 'CONTRACTORS' },
                          { title: 'CLERK OF WORKS' },
                        ],
                      },
                      { title: 'PROJECTS TEAM' },
                    ],
                  },
                ],
              },
            ],
          },
          {
            title: 'CHIEF PROJECT MANAGER',
          },
          {
            title: 'CHIEF FINANCE OFFICER',
            children: [
              {
                title: 'COMMERCIAL MANAGER',
                children: [
                  {
                    title: 'HEAD OF CUSTOMER SERVICE',
                    children: [
                      {
                        title: 'SENIOR ACCOUNT MANAGER',
                        children: [{ title: 'ACCOUNT MANAGERS' }],
                      },
                    ],
                  },
                ],
              },
              {
                title: 'FINANCIAL MANAGER',
                children: [{ title: 'ACCOUNTANT' }],
              },
            ],
          },
          {
            title: 'CHIEF RISK & INTERNAL AUDITOR',
            children: [
              { title: 'HEAD OF RISK MANAGEMENT' },
              { title: 'HEAD OF LEGAL' },
            ],
          },
          {
            title: 'CHIEF OF STAFF',
            children: [
              { title: 'CREDIT MANAGER' },
              {
                title: 'MARKETING MANAGER',
                children: [
                  {
                    title: 'ASST BRAND AND MARKETING MANAGER',
                    children: [
                      { title: 'INFLUENCERS' },
                      { title: 'BRAND AMBASSADORS' },
                      { title: 'SUPER AGENT' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  const renderNode = (node: OrgNode, level: number = 0) => {
    const isCEO = node.title === 'CHIEF EXECUTIVE OFFICER';
    const isAdvisory = node.title === 'ADVISORY BOARD';
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div className="flex flex-col items-center relative" key={`${node.title}-${level}`}>
        {/* Node Box */}
        <div
          className={`
            relative px-3 py-2 rounded-lg shadow-md border-2 font-semibold text-center
            transition-all duration-200 hover:shadow-lg
            ${
              isAdvisory
                ? 'bg-gradient-to-r from-primary to-primary/90 text-white border-primary text-xs max-w-[180px]'
                : isCEO
                ? 'bg-gradient-to-r from-secondary to-secondary/90 text-white border-secondary text-xs max-w-[200px]'
                : node.isGroup
                ? 'bg-gray-100 text-gray-700 border-gray-300 text-[10px] max-w-[120px] px-2 py-1.5'
                : 'bg-white text-gray-800 border-gray-300 text-[10px] max-w-[140px] px-2 py-1.5'
            }
          `}
        >
          {node.title}
        </div>

        {/* Connector Line (downward) */}
        {hasChildren && (
          <div className="w-0.5 h-4 bg-gray-400 my-1"></div>
        )}

        {/* Children Container */}
        {hasChildren && (
          <div className="flex items-start gap-2 mt-1 relative">
            {/* Horizontal connector line above children */}
            {node.children && node.children.length > 1 && (
              <div
                className="absolute top-0 left-1/2 h-0.5 bg-gray-400 transform -translate-x-1/2"
                style={{
                  width: `${Math.max(80, ((node.children?.length || 0) - 1) * 120)}px`,
                }}
              ></div>
            )}

            {/* Render each child */}
            <div className="flex gap-2 items-start flex-wrap justify-center">
              {node.children && node.children.map((child, index) => {
                return (
                  <div key={`${child.title}-${index}`} className="flex flex-col items-center relative">
                    {/* Vertical connector line to child */}
                    {node.children && node.children.length > 1 && (
                      <div className="absolute top-0 left-1/2 w-0.5 h-4 bg-gray-400 transform -translate-x-1/2 -translate-y-full"></div>
                    )}
                    {renderNode(child, level + 1)}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full overflow-y-auto overflow-x-hidden py-6 bg-gray-50 rounded-lg max-h-[800px]">
      <div className="flex justify-center px-4">
        {renderNode(orgStructure)}
      </div>
    </div>
  );
};

export default OrganizationalChart;
